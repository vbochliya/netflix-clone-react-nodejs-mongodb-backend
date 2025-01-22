## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── utils/
│   │   └── jwtHelper.js
│   └── app.js
├── .env
├── package.json
└── README.md
```

This is the structure of the backend directory for the project. Each folder contains specific files related to its functionality:

- **config/**: Configuration files.
- **controllers/**: Controllers for handling requests.
- **middlewares/**: Middleware functions.
- **models/**: Database models.
- **routes/**: Route definitions.
- **utils/**: Utility functions.
- **app.js**: Main application file.
- **.env**: Environment variables.
- **package.json**: Project dependencies and scripts.
- **README.md**: Project documentation.
