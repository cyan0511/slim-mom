import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator"; // Importing the validator library for email validation

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true, // Adding an index for faster lookup
      validate: {
        validator: (v) => validator.isEmail(v), // Using validator.js for email validation
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verification token is required"],
    },
  },
  { versionKey: false, timestamps: true } // Enable timestamps
);

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  try {
    // Check if the password field is modified
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(12); // Use a higher salt round for better security
      this.password = await bcrypt.hash(this.password, salt);
    }
    next(); // Proceed to save the user
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

const User = model("user", userSchema);

export { User };
