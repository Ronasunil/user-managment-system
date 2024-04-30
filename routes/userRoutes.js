const express = require("express");
const {
  signup,
  login,
  validateToken,
} = require("../controller/authController");
const {
  deleteTour,
  updateTour,
  getAllTours,
} = require("../controller/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/validate-token", validateToken);
router.get("/", getAllTours);
router.route("/:userId").delete(deleteTour).patch(updateTour);

module.exports = router;
