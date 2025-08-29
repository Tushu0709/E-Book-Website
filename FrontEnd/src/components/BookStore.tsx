// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Star, Heart, Download, Eye } from "lucide-react";
// import Footer from "./Footer";
// import Navigation from "./Navigation";
// import BookDetails from "./BookDetails";
// import { useWishlist } from "../context/WishlistContext";
// import axios from "axios";
// import { useCart } from "../context/CartContext";
// import { CiShoppingCart } from "react-icons/ci";

// const getBook = async () => {
//   const res = await axios.get("http://localhost:5000/api/book");
//   return res.data;
// };

// const categories = [
//   "All",
//   "Fiction",
//   "Romance",
//   "Self-help",
//   "Adventure",
//   "Memoir",
//   "Science Fiction",
//   "Mystery",
//   "Spirituality",
//   "History",
// ];

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.1, duration: 0.5 },
//   }),
// };

// const BookStore = () => {
//   const [books, setBooks] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getBook();
//         setBooks(data);
//       } catch (error) {
//         console.error("error", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const [selectedBook, setSelectedBook] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
//   const { addToCart, removeFromCart, cartItems, updateQuantity } = useCart();

//   const filteredBooks =
//     activeCategory === "All"
//       ? books
//       : books.filter((book) => book.genre === activeCategory);

//   return (
//     <>
//       <Navigation />

//       <section className="py-20 px-10 bg-[#fffaf0] min-h-screen lg:mt-12">
//         <motion.h1
//           className="text-4xl md:text-5xl font-bold text-center text-deep-brown mb-4"
//           variants={fadeInUp}
//           initial="hidden"
//           animate="visible"
//           custom={0}
//         >
//           Browse Books
//         </motion.h1>

//         <motion.p
//           className="text-center text-[#6b4c3b] max-w-xl mx-auto mb-10"
//           variants={fadeInUp}
//           initial="hidden"
//           animate="visible"
//           custom={1}
//         >
//           Discover your next read from our carefully curated collection.
//         </motion.p>

//         {/* Category Filter */}
//         <motion.div
//           className="flex flex-wrap justify-center gap-4 mb-12"
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           custom={2}
//         >
//           {categories.map((cat, idx) => (
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 py-2 rounded-full border transition-all duration-300 text-sm sm:text-base font-semibold 
//               ${
//                 activeCategory === cat
//                   ? "bg-[#F97316] text-white border-[#F97316] shadow-md scale-105"
//                   : "bg-white text-[#F97316] border-[#F97316] hover:bg-[#fff7ed]"
//               }`}
//             >
//               {cat}
//             </motion.button>
//           ))}
//         </motion.div>

//         {/* Books Grid */}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           {filteredBooks.map((book, index) => (
//             <motion.div
//               key={index}
//               variants={fadeInUp}
//               initial="hidden"
//               animate="visible"
//               custom={index / 5}
//             >
//               <Card className="group hover:shadow-book transition-all duration-300 hover:-translate-y-2 bg-[#FFF] border border-[#fcd34d]/40">
//                 <CardContent className="p-0">
//                   <div className="relative overflow-hidden rounded-t-lg">
//                     <img
//                       src={book.cover}
//                       alt={book.title}
//                       className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
//                     />
//                     {book.isPopular && (
//                       <div className="absolute top-3 left-3 bg-[#F97316] text-white px-2 py-1 rounded-full text-xs font-semibold">
//                         Popular
//                       </div>
//                     )}
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#2F1B0C]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                     <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <motion.button
//                         whileTap={{ scale: 0.9 }}
//                         className="flex-1"
//                       ></motion.button>

//                       <motion.button
//                         whileTap={{ scale: 0.9 }}
//                         className="flex-1"
//                       >
//                         {book.file && (
//                           <a
//                             href={book.file}
//                             download
//                             className="flex-1"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             <Button size="sm" variant="cozy" className="w-20">
//                               <Download className="h-4 w-4" />
//                             </Button>
//                           </a>
//                         )}
//                       </motion.button>

//                       <motion.button whileTap={{ scale: 0.9 }}>
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           onClick={() =>
//                             isInWishlist(book.title)
//                               ? removeFromWishlist(book.title)
//                               : addToWishlist(book)
//                           }
//                           className={`bg-[#fffaf0]/70 backdrop-blur-sm ${
//                             isInWishlist(book.title)
//                               ? "text-red-500"
//                               : "text-gray-500"
//                           }`}
//                         >
//                           <Heart
//                             className={`h-4 w-4 ${
//                               isInWishlist(book.title) ? "fill-red-500" : ""
//                             }`}
//                           />
//                         </Button>
//                         {cartItems.some((item) => item._id === book._id) ? (
//                           <div className="flex items-center gap-2 bg-[#fffaf0]/70 backdrop-blur-sm rounded-md px-2 py-1">
//                             <button
//                               onClick={() =>
//                                 updateQuantity(
//                                   book._id,
//                                   Math.max(
//                                     1,
//                                     cartItems.find(
//                                       (item) => item._id === book._id
//                                     )?.quantity! - 1
//                                   )
//                                 )
//                               }
//                               className="w-6 h-6 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition"
//                             >
//                               <CiShoppingCart className="h-4 w-4 text-amber-100" />
//                             </button>
//                             <span className="text-sm font-bold text-[#3e2c23]">
//                               {
//                                 cartItems.find((item) => item._id === book._id)
//                                   ?.quantity
//                               }
//                             </span>
//                             <button
//                               onClick={() =>
//                                 updateQuantity(
//                                   book._id,
//                                   (cartItems.find(
//                                     (item) => item._id === book._id
//                                   )?.quantity || 1) + 1
//                                 )
//                               }
//                               className="w-6 h-6 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition"
//                             >
//                               <CiShoppingCart className="h-4 w-4 text-amber-100" />
//                             </button>
//                           </div>
//                         ) : (
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             onClick={() => addToCart(book)}
//                             className="bg-[#fffaf0]/70 backdrop-blur-sm text-gray-500"
//                           >
//                             <CiShoppingCart className="h-4 w-4" />
//                           </Button>
//                         )}{" "}
//                       </motion.button>
//                     </div>
//                   </div>

//                   <div className="p-5">
//                     <div className="flex items-start justify-between mb-2">
//                       <span className="text-xs font-medium text-[#F97316] bg-[#FFF3E0] px-2 py-1 rounded">
//                         {book.genre}
//                       </span>
//                       <div className="flex items-center gap-1">
//                         <Star className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" />
//                         <span className="text-sm font-medium text-[#2F1B0C]">
//                           {book.rating}
//                         </span>
//                       </div>
//                     </div>

//                     <h3 className="font-bold text-lg text-[#1A1A1A] mb-1 group-hover:text-[#F97316] transition-colors">
//                       {book.title}
//                     </h3>
//                     <p className="text-[#6B4F3F] text-sm mb-3">
//                       by {book.author}
//                     </p>
//                     <p className="text-sm text-[#5A4636] mb-4 line-clamp-2">
//                       {book.description}
//                     </p>

//                     <div className="flex items-center justify-between">
//                       <span className="text-xs text-[#8C7E70]">
//                         {book.downloads} downloads
//                       </span>
//                       <motion.button whileTap={{ scale: 0.95 }}>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => setSelectedBook(book)}
//                           className="text-[#F97316] hover:text-white hover:bg-[#F97316]"
//                         >
//                           Read More
//                         </Button>
//                       </motion.button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         {selectedBook && (
//           <BookDetails
//             book={selectedBook}
//             closeModal={() => setSelectedBook(null)}
//           />
//         )}
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default BookStore;


// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Star, Heart, Download } from "lucide-react";
// import Footer from "./Footer";
// import Navigation from "./Navigation";
// import BookDetails from "./BookDetails";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";
// import { CiShoppingCart } from "react-icons/ci";
// import axios from "axios";

// // Fetch books
// const getBooks = async () => {
//   const res = await axios.get("http://localhost:5000/api/book");
//   return res.data;
// };

// const getStore = async () => {
//   const res = await axios.get("http://localhost:5000/api/bookstore");
//   return res.data;
// }

// // Animation variant
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.1, duration: 0.5 },
//   }),
// };

// const BookStore = () => {
//   const [books, setBooks] = useState([]);
//   const [bookStore, setBookStore] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("All");

//   const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
//   const { addToCart, cartItems, updateQuantity } = useCart();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getBooks();
//         setBooks(data);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   useEffect(() => {
//     const fetchStore = async () => {
//       try {
//         const data = await getStore();
//         setBookStore(data);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };

//     fetchStore();
//   }, []);

//   const filteredBooks =
//     activeCategory === "All"
//       ? books
//       : books.filter((book) => book.genre === activeCategory);

//   return (
//     <>
//       <Navigation />

//       <section className="py-32 px-10 bg-[#fffaf0] min-h-screen">
//         <div className="max-w-8xl mx-auto px-6">
//         {/* Title */}
//         <motion.h1
//           className="text-4xl md:text-5xl font-bold text-center text-[#3e2c23] mb-4"
//           variants={fadeInUp}
//           initial="hidden"
//           animate="visible"
//           custom={0}
//         >
//           Browse Books
//         </motion.h1>

//         {/* Subtitle */}
//         <motion.p
//           className="text-center text-[#6b4c3b] max-w-xl mx-auto mb-10"
//           variants={fadeInUp}
//           initial="hidden"
//           animate="visible"
//           custom={1}
//         >
//           Discover your next read from our carefully curated collection.
//         </motion.p>

//         {/* Category Buttons */}
//         <motion.div
//           className="flex flex-wrap justify-center gap-4 mb-12"
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           custom={2}
//         >
//           {bookStore.map((cat) => (
//             <motion.button
//               key={cat}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 py-2 rounded-full border transition-all duration-300 text-sm sm:text-base font-semibold ${
//                 activeCategory === cat
//                   ? "bg-[#f97316] text-white border-[#f97316] shadow-md scale-105"
//                   : "bg-white text-[#f97316] border-[#f97316] hover:bg-[#fff7ed]"
//               }`}
//             >
//               {cat}
//             </motion.button>
//           ))}
//         </motion.div>

//         {/* Book Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           {filteredBooks.map((book, i) => (
//             <motion.div
//               key={book._id}
//               variants={fadeInUp}
//               initial="hidden"
//               animate="visible"
//               custom={i / 5}
//             >
//               <Card className="group hover:shadow-xl transition-all duration-300 bg-white border border-[#fcd34d]/40 rounded-xl overflow-hidden">
//                 <CardContent className="p-0">
//                   <div className="relative">
//                     <img
//                       src={book.cover}
//                       alt={book.title}
//                       className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
//                     />

//                     {book.isPopular && (
//                       <div className="absolute top-3 left-3 bg-[#f97316] text-white px-2 py-1 rounded-full text-xs font-semibold">
//                         Popular
//                       </div>
//                     )}

//                     <div className="absolute inset-0 bg-gradient-to-t from-[#2F1B0C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                     <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       {book.file && (
//                         <a
//                           href={book.file}
//                           download
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           <Button size="sm" variant="cozy" className="w-40">
//                             <Download className="h-4 w-4" />
//                           </Button>
//                         </a>
//                       )}

//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         onClick={() =>
//                           isInWishlist(book.title)
//                             ? removeFromWishlist(book.title)
//                             : addToWishlist(book)
//                         }
//                         className={`bg-[#fffaf0]/70 backdrop-blur-sm ${
//                           isInWishlist(book.title)
//                             ? "text-red-500"
//                             : "text-gray-500"
//                         }`}
//                       >
//                         <Heart
//                           className={`h-4 w-4 ${
//                             isInWishlist(book.title) ? "fill-red-500" : ""
//                           }`}
//                         />
//                       </Button>

//                       {cartItems.some((item) => item._id === book._id) ? (
//                         <div className="flex items-center gap-2 bg-[#fffaf0]/70 backdrop-blur-sm rounded-md px-2 py-1">
//                           <button
//                             onClick={() =>
//                               updateQuantity(
//                                 book._id,
//                                 Math.max(
//                                   1,
//                                   cartItems.find((item) => item._id === book._id)
//                                     ?.quantity - 1
//                                 )
//                               )
//                             }
//                             className="w-6 h-6 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition"
//                           >
//                             <CiShoppingCart className="h-4 w-4 text-amber-100" />
//                           </button>
//                           <span className="text-sm font-bold text-[#3e2c23]">
//                             {
//                               cartItems.find((item) => item._id === book._id)
//                                 ?.quantity
//                             }
//                           </span>
//                           <button
//                             onClick={() =>
//                               updateQuantity(
//                                 book._id,
//                                 (cartItems.find(
//                                   (item) => item._id === book._id
//                                 )?.quantity || 1) + 1
//                               )
//                             }
//                             className="w-6 h-6 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition"
//                           >
//                             <CiShoppingCart className="h-4 w-4 text-amber-100" />
//                           </button>
//                         </div>
//                       ) : (
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           onClick={() => addToCart(book)}
//                           className="bg-[#fffaf0]/70 backdrop-blur-sm text-gray-500"
//                         >
//                           <CiShoppingCart className="h-4 w-4" />
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   <div className="p-5">
//                     <div className="flex items-start justify-between mb-2">
//                       <span className="text-xs font-medium text-[#f97316] bg-[#fff7ed] px-2 py-1 rounded">
//                         {book.genre}
//                       </span>
//                       <div className="flex items-center gap-1">
//                         <Star className="h-4 w-4 fill-[#fcd34d] text-[#fcd34d]" />
//                         <span className="text-sm font-medium text-[#3e2c23]">
//                           {book.rating}
//                         </span>
//                       </div>
//                     </div>

//                     <h3 className="font-bold text-lg text-[#1a1a1a] mb-1 group-hover:text-[#f97316] transition-colors">
//                       {book.title}
//                     </h3>
//                     <p className="text-[#6b4f3f] text-sm mb-1">
//                       by {book.author}
//                     </p>
//                     <p className="text-sm text-[#5a4636] mb-3 line-clamp-2">
//                       {book.description}
//                     </p>

//                     <div className="flex items-center justify-between">
//                       <span className="font-semibold text-[#8b5e3c] text-xl">
//                         ₹{book.price || 0} 
//                       </span>
//                       <motion.button whileTap={{ scale: 0.95 }}>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => setSelectedBook(book)}
//                           className="text-[#f97316] hover:text-white hover:bg-[#f97316]"
//                         >
//                           Read More
//                         </Button>
//                       </motion.button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         {selectedBook && (
//           <BookDetails
//             book={selectedBook}
//             closeModal={() => setSelectedBook(null)}
//           />
//         )}
//         </div>
//       </section>


//       <Footer />
//     </>
//   );
// };

// export default BookStore;




import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, Download } from "lucide-react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import BookDetails from "./BookDetails";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { CiShoppingCart } from "react-icons/ci";
import axios from "axios";

// Fetch books
const getBooks = async () => {
  const res = await axios.get("http://localhost:5000/api/book");
  return res.data;
};

// Fetch categories
const getStore = async () => {
  const res = await axios.get("http://localhost:5000/api/bookstore");
  return res.data;
};

// Animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const BookStore = () => {
  const [books, setBooks] = useState([]);
  const [bookStore, setBookStore] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, cartItems, updateQuantity } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const data = await getStore();
        setBookStore(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchStore();
  }, []);

  const filteredBooks =
    activeCategory === "All"
      ? books
      : books.filter((book) => book.genre === activeCategory);

  return (
    <>
      <Navigation />

      <section className="py-32 px-10 bg-[#fffaf0] min-h-screen">
        <div className="max-w-8xl mx-auto px-6">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center text-[#3e2c23] mb-4"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Browse Books
          </motion.h1>

          <motion.p
            className="text-center text-[#6b4c3b] max-w-xl mx-auto mb-10"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Discover your next read from our carefully curated collection.
          </motion.p>

          {/* Category Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={2}
          >
            {bookStore.map((cat) => (
              <motion.button
                key={cat.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-full border transition-all duration-300 text-sm sm:text-base font-semibold ${
                  activeCategory === cat.name
                    ? "bg-[#f97316] text-white border-[#f97316] shadow-md scale-105"
                    : "bg-white text-[#f97316] border-[#f97316] hover:bg-[#fff7ed]"
                }`}
              >
                {cat.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Book Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {filteredBooks.map((book, i) => (
              <motion.div
                key={book._id}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={i / 5}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 bg-white border border-[#fcd34d]/40 rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {book.isPopular && (
                        <div className="absolute top-3 left-3 bg-[#f97316] text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Popular
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#2F1B0C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {book.file && (
                          <a
                            href={book.file}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="sm" variant="cozy" className="w-40">
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
                                    )?.quantity - 1
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
                                  (cartItems.find(
                                    (item) => item._id === book._id
                                  )?.quantity || 1) + 1
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
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-medium text-[#f97316] bg-[#fff7ed] px-2 py-1 rounded">
                          {book.genre}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#fcd34d] text-[#fcd34d]" />
                          <span className="text-sm font-medium text-[#3e2c23]">
                            {book.rating}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-bold text-lg text-[#1a1a1a] mb-1 group-hover:text-[#f97316] transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-[#6b4f3f] text-sm mb-1">
                        by {book.author}
                      </p>
                      <p className="text-sm text-[#5a4636] mb-3 line-clamp-2">
                        {book.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#8b5e3c] text-xl">
                          ₹{book.price || 0}
                        </span>
                        <motion.button whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedBook(book)}
                            className="text-[#f97316] hover:text-white hover:bg-[#f97316]"
                          >
                            Read More
                          </Button>
                        </motion.button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {selectedBook && (
            <BookDetails
              book={selectedBook}
              closeModal={() => setSelectedBook(null)}
            />
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BookStore;
