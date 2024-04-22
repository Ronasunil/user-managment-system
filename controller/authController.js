const User = require("../model/userModel");

const signup = async function (req, res) {
  const { name, username, password, confirmPassword } = req.body;

  await User.create({
    name,
    username,
    password,
    confirmPassword,
  });
};
