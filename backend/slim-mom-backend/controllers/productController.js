import { Product } from "../models/productModel.js";

const listProducts = async (req, res) => {
    const { page = 1, limit = 20, categories, weight, title, calories, bloodType } = req.query;
    // const query = favorite !== undefined && favorite !== '' ? { favorite } : {};

    // Construct a query object based on the filter
    const query = {};

    if (categories) {
        query.categories = categories;
    }

    if (weight) {
        query.weight = weight;
    }

    if (title) {
        query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    }

    if (calories) {
        query.calories = calories;
    }

    if (bloodType) {
        // query.groupBloodNotAllowed = { $ne: bloodType }; // Match any specified boolean values
        query[`groupBloodNotAllowed.${bloodType}`] = true;
    }

    // Query the database
    const products = await Product.find(query);

    /*const result = await Product.find()
        .skip((page - 1) * limit)
        .limit(limit);*/
    res.json(products);
};


export { listProducts };