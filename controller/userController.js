const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllTours = catchAsync(async function (req, res) {
  const users = await User.find({ role: "user" });

  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.updateTour = catchAsync(async function (req, res) {
  const { userId } = req.params;
  console.log("update");
  const updatedTour = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 200,
    data: updatedTour,
  });
});

exports.deleteTour = catchAsync(async function (req, res) {
  const { userId } = req.params;
  console.log(userId);
  await User.findByIdAndDelete(userId);

  res.status(200).json({
    status: "success",
    message: "successfully deleted",
  });
});
