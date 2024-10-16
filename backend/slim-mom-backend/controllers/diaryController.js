import { Diary } from "../models/diaryModel.js";
import {HttpError} from "../errors/HttpError.js";

const addDiary = async (req, res, next) => {
    try {
        const { date, title, grams, calories, calorieIntake, category } = req.body;
        const userId = req.user._id;

        // Create a new diary record
        const newRecord = await Diary.create({
            userId,
            date,
            title,
            grams,
            calories,
            calorieIntake,
            category,
        });

        // Return the created record
        res.status(201).json(newRecord);
    } catch (err) {
        next(err);
    }
};

const listDiaries = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { date } = req.query;

        const filter = {
            userId
        };

        if (date) {
            filter.date = date;
        }

        const diaries = await Diary.find(filter);

        res.status(200).json(diaries);
    } catch (err) {
        next(new HttpError(500, 'Error listing diaries.'));
    }
};

// function to delete a diary
const deleteDiary = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find the diary and delete
        const diary = await Diary.findOneAndDelete({ _id: id});

        if (!diary) {
            next(new HttpError(404, "Diary not found."));
        }

        res.status(200).json({ message: "Diary deleted successfully" });
    } catch (err) {
        next(err);
    }
};

export { addDiary, listDiaries, deleteDiary };