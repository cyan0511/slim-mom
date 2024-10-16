import { Schema, model } from "mongoose";

const diarySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        date: {
            type: Date,
            required: [true],
        },
        title: {
            type: String,
            required: [true],
        },
        grams: {
            type: Number,
            required: [true],
        },
        calories: {
            type: Number,
            required: [true],
        },
        calorieIntake: {
            type: Number,
            required: [true],
        },
        category: {
            type: String,
            required: [true],
        },
    },
    { versionKey: false }
);

const Diary = model("diaries", diarySchema);

export { Diary };