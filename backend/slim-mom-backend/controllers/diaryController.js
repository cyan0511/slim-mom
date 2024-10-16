import { Diary } from "../models/diaryModel.js";
import { HttpError } from "../errors/HttpError.js";
import { Product } from "../models/productModel.js";

const addDiary = async (req, res, next) => {
    try {
        const { productId, date, grams } = req.body;
        const userId = req.user._id;

        const product = await Product.findById(productId);

        if (!product) {
           return next (new HttpError(404, 'Invalid product id'));
        }

        const { title, calories } = product;

        const calorieIntake = (calories / 100) * grams;
        // Create a new diary record
        const diary = await Diary.create({
            userId,
            productId,
            date,
            title,
            grams,
            calories: calorieIntake,
        });

        // Return the created record
        res.status(201).json(diary);
    } catch (err) {
        console.log(err);
        next(new HttpError(500, "error adding diary"));
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

        res.status(200).json({ message: "Diary deleted." });
    } catch (err) {
        next(err);
    }
};

export { addDiary, listDiaries, deleteDiary };