import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator"; // For email validation

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"], // Optional password length check
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true, // For faster lookup on queries
      validate: {
        validator: (v) => validator.isEmail(v), // Using validator.js for email validation
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    token: {
      type: String,
      default: null, // Will store JWT or session token for authentication
    },
    verify: {
      type: Boolean,
      default: false, // To check if the user's email is verified
    },
    verificationToken: {
      type: String,
      required: function () {
        return !this.verify; // Required only if the user is not verified
      },
    },
  },
  { versionKey: false, timestamps: true } // Disabling __v, enabling createdAt/updatedAt fields
);

// Pre-save hook to hash password if it's new or modified
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(12); // Using a higher salt round (12)
      this.password = await bcrypt.hash(this.password, salt);
    }
    next(); // Proceed to save the user
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

// Method to compare provided password with the hashed password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema); // Consistent capitalization in model naming

export { User };
