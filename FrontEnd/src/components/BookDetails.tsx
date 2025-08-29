import React from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { Download } from "lucide-react";

const BookDetails = ({ book, closeModal }) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.3 }}
        className="relative w-[90%] max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
        >
          <RxCross2 size={24} />
        </button>

        {/* Book Cover */}
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-[65vh] object-cover"
        />

        {/* Book Info */}
        <div className="p-6 text-[#3e2c23]">
          <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
          <p className="text-sm mb-1">
            by <span className="font-semibold">{book.author}</span>
          </p>
          <p className="text-[#6b4c3b] text-sm mb-3">{book.description}</p>
          <p className="text-sm text-[#a67c52] mb-4">
            Genre: {book.genre} | Rating: {book.rating} ⭐
          </p>

          {/* Download Button */}
          {book.file ? (
            <a
              href={book.file}
              download
              className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#fb923c] text-white px-4 py-2 rounded-md transition"
            >
              <Download className="h-5 w-5" />
              Download Book
            </a>
          ) : (
            <p className="text-sm text-red-500">Download not available</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BookDetails;
