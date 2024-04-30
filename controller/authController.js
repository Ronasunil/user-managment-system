const { decode } = require("punycode");
const User = require("../model/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = function (id) {
  let token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
};

exports.signup = catchAsync(async function (req, res) {
  const { name, username, password, confirmPassword } = req.body;

  // checking every field exist
  if (!name || !username || !password || !confirmPassword)
    throw new AppError("Provide name, username, password and confirmPassword");

  // creating user
  const user = await User.create({
    name,
    username,
    password,
    confirmPassword,
  });

  // creating token
  const token = signToken(user._id);
  console.log(token);

  user.password = undefined;
  user.token = token;
  res.status(200).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
});

exports.login = catchAsync(async function (req, res) {
  const { username, password } = req.body;

  // checking both are passed in
  if (!username || !password)
    throw new AppError("Please provide username and email", 400, "login");

  // checking user exist with the username
  const user = await User.findOne({ username });
  if (!user)
    throw new AppError("username or password is incorrect", 401, "login");

  // checking password is correct
  const isPasswordCorrect = await user.login(password, user.password);
  if (!isPasswordCorrect)
    throw new AppError("username or password is incorrect", 401, "login");

  let token = signToken(user._id);

  res.status(200).json({
    status: "success",
    data: { user, token },
  });
});

exports.validateToken = catchAsync(async function (req, res) {
  const token = req.headers.authorization.split(" ")[1];

  // check if there is token
  if (!token) throw new AppError(`Can't find token`);

  // verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decoded) throw new AppError("invalid token", 498);

  // check user exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) throw new AppError("user account must be deleted", 404);

  res.status(200).json({
    status: "success",
    authenticated: true,
    data: {
      user: currentUser,
    },
  });
});
