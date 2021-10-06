const User = require("../model/user");
const bcrypt = require("bcryptjs");
const {
  isEmpty,
  isAlpha,
  isAlphanumeric,
  isEmail,
  isStrongPassword,
} = require("validator");

const createUser = async (req, res) => {
  const body = req.body;
  let errObj = {};
  const { firstName, lastName, username, email, password } = req.body;
  //All fields must be filled out
  for (let key in body) {
    if (isEmpty(body[key])) {
      errObj.key = `${key} cannot be empty`;
    }
  }

  if (!isAlpha(firstName)) {
    errObj.firstName = "First Name cannot have special characters or numbers";
  }

  if (!isAlpha(lastName)) {
    errObj.lastName = "Last Name cannot have special characters or numbers";
  }

  if (!isAlphanumeric(username)) {
    errObj.username = "Username cannot have special characters";
  }

  if (!isEmail(email)) {
    errObj.email = "please enter a valid email";
  }

  if (!isStrongPassword(password)) {
    errObj.password =
      "Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character and at least 8 characters long";
  }

  if (Object.keys(errObj).length > 0) {
    return res.status(500).json({ message: "error", error: errObj });
  }

  try {
    let salt = await bcrypt.genSalt(15);
    let hashedword = await bcrypt.hash(password, salt);

    const createdUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedword,
    });

    let savedUser = await createdUser.save();

    res.json({ message: "success", payload: savedUser });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
};

const login = async (req, res) => {
  const body = req.body;
  const { email, password } = req.body;
  let errObj = {};

  if (isEmpty(email)) {
    errObj.email = "email cannot be empty";
  }
  if (isEmail(email)) {
    errObj.email = "please enter a valid email";
  }
  if (isEmpty(password)) {
    errObj.password = "password cannot be empty";
  }
  if (isStrongPassword(password)) {
    errObj.password =
      "Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character and at least 8 characters long";
  }

  try {
    let foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      return res.status(500).json({
        message: "error",
        error: "invalid username or password. please try again",
      });
    } else {
      let passwordCheck = await bcrypt.compare(password, foundUser.password);

      if (!passwordCheck) {
        return res.status(500).json({
          message: "error",
          error: "invalid username or password. please try again",
        });
      } else {
        res.json({ message: "success" });
      }
    }
  } catch (e) {
    res.status(500).json({ message: "error", error: e.message });
  }
};
module.exports = {
  createUser,
  login,
};
