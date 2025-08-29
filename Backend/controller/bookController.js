const Book = require("../models/Book");

exports.getBook = async (req, res) => {
  try {
    const data = await Book.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching", error });
  }
};
