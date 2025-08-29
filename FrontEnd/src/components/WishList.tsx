import React from "react";
import { useWishlist } from "../context/WishlistContext";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Trash2 } from "lucide-react";

const WishList = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <>
      <Navigation />
      <section className="min-h-screen bg-[#fffaf0] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#3e2c23] mb-8 text-center">Your Wishlist</h2>
          {wishlist.length === 0 ? (
            <p className="text-center text-[#7b5d4a] text-lg">No books in wishlist.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((book) => (
                <div
                  key={book.title}
                  className="bg-white border border-[#fcd34d]/40 rounded-xl shadow-md p-4 flex flex-col"
                >
                  <img src={book.cover} alt={book.title} className="h-48 w-full object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-semibold text-[#3e2c23] mb-1">{book.title}</h3>
                  <p className="text-sm text-[#7b5d4a]">by {book.author}</p>
                  <p className="text-sm text-[#a67c52] mb-4">{book.genre}</p>
                  <button
                    onClick={() => removeFromWishlist(book.title)}
                    className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WishList;
