import {Product} from "../models/productModel.js";
import {HttpError} from "../errors/HttpError.js";

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

const listCategories = async (req, res, next) => {
    try {
        // Extract blood type from the request query
        const { bloodType } = req.query;

        if (bloodType && +bloodType < 1 || +bloodType > 4) {
            return next(new HttpError(400, "Blood type must be between 1 - 4"));
        }

        const categories = await getCategories(bloodType);
        // Return the list of categories
        res.status(200).json({
            data: categories,
        });
    } catch (error) {
        next(new HttpError(500, 'Error listing categories'));
    }
};

export const getCategories = async bloodType => {
    const filter = (bloodType &&  {[`groupBloodNotAllowed.${bloodType}`]: true}) || {};

    // Find products where the value at groupBloodNotAllowed[bloodTypeNum] is false
    const products = await Product.find(filter).select("categories -_id"); // Only select the 'categories'
    // Extract categories and filter out duplicates using Set
    return [...new Set(products.map(product => product.categories))];
};

const deleteProducts = async (req, res, next) => {
    const { categories, weight, title, calories, bloodType, consumedDate } = req.query;

    // Build query for deletion similar to listProducts
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
        query[`groupBloodNotAllowed.${bloodType}`] = true;
    }
    //Delete product on specific day
    if (consumedDate) {
        const date = new Date(consumedDate);
        date.setUTCHours(0, 0, 0, 0);  // Ensure date is at the start of the day
        query.consumedDate = date;
    }

    try {
        const result = await Product.deleteMany(query);

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No products found to delete' });
        }

        res.status(200).json({ message: `${result.deletedCount} products deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message}) ;
    }
};


export { listProducts, listCategories, deleteProducts };