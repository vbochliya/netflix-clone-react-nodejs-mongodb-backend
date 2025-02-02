const Razorpay = require("razorpay");
const express = require("express");
const router = express.Router();

const { generateToken } = require("../../utils/jwtHelper");

const Payment = require("../../models/Payment");
const Plans = require("../../models/Plans");
const User = require("../../models/User");

const validateAndUpdateSubscription = async (
  userId,
  planId,
  razorpayOrderId,
  razorpayPaymentId
) => {
  const user = await User.findById(userId);
  const plan = await Plans.findById(planId);
  const payment = await Payment.findById(user.paymentId);

  if (!plan || !payment) return false;

  if (
    payment.razorpayOrderId !== razorpayOrderId ||
    payment.userId !== user.id ||
    user.subscription.planId !== planId ||
    user.subscription.paymentId !== paymentId
  )
    return false;

  Payment.razorpayPaymentId = razorpayPaymentId;
  Payment.status = "paid";
  await Payment.save();

  user.subscription.startDate = new Date();
  user.subscription.endDate = new Date();
  user.subscription.endDate.setDate(
    user.subscription.endDate.getDate() + plan.duration
  );
  user.subscription.status = "active";
  await user.save();

  return true;
};
//create order on rezorpay and save the payment details in db
router.post("/Place-order", async (req, res) => {
  const { amount, currency, plan_id } = req.body;
  const user = req.user;

  if (!amount || !currency || !plan_id) {
    return res.status(400).json("Amount and currency is required");
  }
  const subscriptionPlanInstance = await Plans.findById(planId);
  if (!subscriptionPlanInstance || subscriptionPlanInstance.price !== amount) {
    return res.status(400).json("Invalid plan id or ammount is not correct");
  }

  const razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });

  const options = {
    amount,
    currency,
    receipt: `receipt#${generateToken()}`,
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    //RESPONCE FORMATE
    // {"amount":10000,
    //     "amount_due":10000,
    //     "amount_paid":0,
    //     "attempts":0,
    //     "created_at":1738526855,
    //     "currency":"INR",
    //     "entity":"order",
    //     "id":"order_Pqy5RSe7C3uQwp",
    //     "notes":[],
    //     "offer_id":null,
    //     "receipt":"receipt#1",
    //     "status":"created"}
    if (!response) {
      return res.status(500).json("Error at razorpay order creation");
    }
    try {
      //save the payment details in db
      const payment = new Payment({
        userId: user.id,
        razorpayOrderId: response.id,
        amount: response.amount,
        currency: response.currency,
      });
      const paymentInstance = await payment.save();
      user.subscription.paymentId = paymentInstance.id;
      user.subscription.planId = plan_id;
      await user.save();

      res.json({
        order_id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Error at saving payment details");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/varify-subscription", async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, plan_id } = req.body;
  const user = req.user;
  if (!razorpay_payment_id || !razorpay_order_id || !plan_id) {
    return res
      .status(400)
      .json("razorpay_payment_id, razorpay_order_id, plan_id IDs are required");
  }

  const razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });

  try {
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    if (!payment) return res.status(500).json("Error at razorpay loading");

    if (payment.status !== "captured")
      return res.status(400).json("Payment not captured");

    const isInstancesUpdated = await validateAndUpdateSubscription(
      user.id,
      plan_id,
      razorpay_order_id,
      razorpay_payment_id
    );
    if (!isInstancesUpdated)
      return res.status(500).json("Error at updating instances");
    res.status(200).json("your subscription is active now");
  } catch (error) {
    res.status(500).json("failed to fetch");
  }
});

module.exports = router;
