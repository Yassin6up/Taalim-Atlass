const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const createUser = require('./routes/register');
const login = require("./routes/login");
const profile  = require('./routes/apis/profile')
//const passport = require('passport');
const cors = require('cors'); // Import the cors middleware
const mattier = require("./routes/apis/mattier")
const verifyAndDecodeToken = require('./utils/decodedToken');
const getUserByToken = require("./routes/getUserByToken")

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests only from this origin
    credentials: true // Enable passing cookies, authorization headers, etc.
})); // Enable CORS for all routes

// Middleware for token verification

// app.use((req, res, next) => {
//   if(req.path.includes('login') || req.path.includes('createUser')) {
//       return next(); // Skip token verification for login and createUser routes
//   }
//   const token = req.headers.authorization;
  
//   if (token) {
//       const decodedToken = verifyAndDecodeToken(token);
//       if (decodedToken) {
//           console.log('User:', decodedToken);
//           req.user = decodedToken; // Set user information in the request object
//           return next(); // Continue to the next middleware or route handler
//       }
//   }

//   return res.status(401).json({ message: 'Unauthorized' }); // Return unauthorized status if token is missing or invalid
// });




app.use('/createUser', createUser);
app.use('/login', login);
app.use('/getUserByToken', getUserByToken);
app.use("/api/" , profile );
app.use('/api/' , mattier);





// Uncomment if implementing Facebook authentication
// app.get('/auth/facebook', passport.authenticate('facebook'));
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { session: false }),
//   (req, res) => {
//     // Redirect or respond with the token based on your requirements
//     res.json({ token: req.user.token });
//   });


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
