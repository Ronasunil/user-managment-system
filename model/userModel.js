const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is missing"],
    minlength: 3,
  },
  username: {
    type: String,
    required: [true, "username is missing"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "password is missing"],
    minlength: 8,
    validate: {
      validator: function (password) {
        //  regex to validate password validation: 1 uppercase, 1 lowercase, 1 special char and 1 num
        return new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ).test(password);
      },
      message:
        "password must contain atleast 1 uppercase, 1 lowercase, 1 special character and a number",
    },
  },

  confirmPassword: {
    type: String,
    required: [true, "Confirm password is missing"],
    validate: {
      validator: function (confirmPassword) {
        return confirmPassword === this.password;
      },

      message: "Confirm password be same as password",
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
