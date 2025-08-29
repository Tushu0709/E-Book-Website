// controllers/bookStoreController.js
const BookStore = require("../models/BookStore");

exports.getStore = async (req, res) => {
  try {
    const data = await BookStore.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching", error });
  }
};
