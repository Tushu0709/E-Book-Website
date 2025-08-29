import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import BookDetails from "./BookDetails";
import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";

import { useWishlist } from "../context/WishlistContext";

import { useCart } from "../context/CartContext";

const getHome = async () => {
  const res = await axios.get("http://localhost:5000/api/home");
  return res.data;
};

const tagColors = {
  Popular: "bg-[#f97316] text-white",
  "Editor's Pick": "bg-[#fcd34d] text-[#3e2c23]",
  Trending: "bg-[#fb923c] text-white",
};

const FeaturedBooks = () => {
  const [home, setHome] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHome();
        setHome(data);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, []);
  const [selectedBook, setSelectedBook] = useState(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, removeFromCart, cartItems, updateQuantity } = useCart();

  return (
    <section className="py-24 bg-gradient-to-br from-[#fffaf0] via-[#fefae0] to-[#fef6e4]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#fde68a]/30 rounded-full px-4 py-2 mb-6">
            <Star className="h-4 w-4 text-[#fcd34d]" />
            <span className="text-[#3e2c23] font-medium">Trending Books</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#3e2c23] mb-6">
            Discover Books That
            <span className="block text-transparent bg-gradient-to-r from-[#fbbf24] via-[#f97316] to-[#fb923c] bg-clip-text">
              Inspire & Transform
            </span>
          </h2>

          <p className="text-lg text-[#5b4636] max-w-2xl mx-auto">
            A curated selection of stories, guides, and memoirs loved by readers
            across genres.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {home.map((book, i) => (
            <motion.div
              key={book.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="group bg-[#fff9f2] hover:shadow-xl transition-all duration-300 border border-[#fcd34d]/30 rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  {/* Book Cover */}
                  <div className="relative">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {book.tag && (
                      <div
                        className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                          tagColors[book.tag]
                        }`}
                      >
                        {book.tag}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3e2c23]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover Buttons */}
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {book.file && (
                        <a
                          href={book.file}
                          download
                          className="flex-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="cozy" className="w-full">
                            <Download className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          isInWishlist(book.title)
                            ? removeFromWishlist(book.title)
                            : addToWishlist(book)
                        }
                        className={`bg-[#fffaf0]/70 backdrop-blur-sm ${
                          isInWishlist(book.title)
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            isInWishlist(book.title) ? "fill-red-500" : ""
                          }`}
                        />
                      </Button>
                      {cartItems.some((item) => item._id === book._id) ? (
                        <div className="flex items-center gap-2 bg-[#fffaf0]/70 backdrop-blur-sm rounded-md px-2 py-1">
                          <button
                            onClick={() =>
                              updateQuantity(
                                book._id,
                                Math.max(
                                  1,
                                  cartItems.find(
                                    (item) => item._id === book._id
                                  )?.quantity! - 1
                                )
                              )
                            }
                            className="w-6 h-6 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition"
                          >
                            <CiShoppingCart className="h-4 w-4 text-amber-100" />
                          </button>
                          <span className="text-sm font-bold text-[#3e2c23]">
                            {
                              cartItems.find((item) => item._id === book._id)
                                ?.quantity
                            }
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                book._id,
                                (cartItems.find((item) => item._id === book._id)
                                  ?.quantity || 1) + 1
                              )
                            }
                            className="w-6 h-6 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition"
                          >
                            <CiShoppingCart className="h-4 w-4 text-amber-100" />
                          </button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => addToCart(book)}
                          className="bg-[#fffaf0]/70 backdrop-blur-sm text-gray-500"
                        >
                          <CiShoppingCart className="h-4 w-4" />
                        </Button>
                      )}{" "}
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium text-[#f97316] bg-[#fde68a]/40 px-2 py-1 rounded">
                        {book.genre}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-[#fcd34d] text-[#fcd34d]" />
                        <span className="text-sm font-medium text-[#3e2c23]">
                          {book.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg text-[#1f1f1f] mb-1 group-hover:text-[#f97316] transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-[#6b4c3b] text-sm mb-2">
                      by {book.author}
                    </p>
                    <p className="text-sm text-[#836b56] mb-4 line-clamp-2">
                      {book.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#a67c52]">
                      <span className="font-semibold text-[#8b5e3c] text-xl">
                        ₹{book.price}{" "}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedBook(book)}
                        className="text-[#f97316] hover:bg-[#f97316]/90 hover:text-white"
                      >
                        Read More
                      </Button>
                      {selectedBook && (
                        <BookDetails
                          book={selectedBook}
                          closeModal={() => setSelectedBook(null)}
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Browse Button */}
        <div className="text-center">
          <Link to="/book">
            <Button className="group bg-[#f97316] hover:bg-[#fb923c] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300">
              Browse All Books
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:animate-bounce">
                →
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
