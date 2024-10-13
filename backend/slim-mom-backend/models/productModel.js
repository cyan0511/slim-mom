import {model, Schema} from "mongoose";

const productSchema = new Schema(
    {
        categories: {
            type: String
        },
        weight: {
            type: Number
        },
        title: {
            type: String,
            unique: true,
        },
        calories: {
            type: Number
        },
        groupBloodNotAllowed: {
            type: [
                Boolean
            ]
        },
        consumedDate: {
            type: Date,
            required: true
        }
    },
    {versionKey: false}
);

//MongoDB collection name = "users"
export const Product = model("products", productSchema);

