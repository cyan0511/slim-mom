import {model, Schema} from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    },
    {versionKey: false}
);

//MongoDB collection name = "users"
export const User = model("users", userSchema);