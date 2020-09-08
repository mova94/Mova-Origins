const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();

// @route   POST api/users
// @desc    register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required")
        .not()
        .isEmpty(),
    check("name", "No Special Characters except for '-'")
        .isAlpha(),
    check('email', "Please include a valid email")
        .isEmail(),
    check('password', "Please enter a password with at lead 6 characters")
        .isLength({min: 6})
  ],
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    res.send("User Route");
  }
);

module.exports = router;
