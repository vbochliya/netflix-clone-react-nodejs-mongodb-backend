const express = require('express');
const User = require('../../models/User'); // Assuming you have a User model

const router = express.Router();

// GET request to view user profile
// GET request to view user profile
router.get('/profile', async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user
        const user = await User.findById(userId).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// PUT request to update user profile
router.put('/profile', async (req, res) => {
    const { name, email, password } = req.body;

    // Build profile object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (email) profileFields.email = email;
    if (password) profileFields.password = password;

    try {
        const userId = req.user.id; // Assuming user ID is available in req.user
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update user
        user = await User.findByIdAndUpdate(
            userId,
            { $set: profileFields },
            { new: true }
        ).select('-password'); // Exclude password from the response

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;