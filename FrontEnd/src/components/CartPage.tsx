import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Trash2 } from "lucide-react";
import AddMoneyModal from "./AddMoneyModal";
import { AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);

  // Total price based on quantity and price
  const totalPrice = cartItems.reduce(
    (acc, book) => acc + (book.price || 0) * (book.quantity || 1),
    0
  );

  const handlePaymentSuccess = (paymentId: string, amount: number) => {
    console.log("✅ Payment Success:", paymentId, amount);
    clearCart(); // clear cart after successful payment
  };

  return (
    <>
      <Navigation />
      <section className="min-h-screen bg-[#fffaf0] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#3e2c23] mb-8 text-center">
            Your Cart
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-center text-[#7b5d4a] text-lg">
              No books in cart.
            </p>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cartItems.map((book) => (
                  <div
                    key={book._id}
                    className="bg-white border border-[#fcd34d]/40 rounded-xl shadow-md p-4 flex flex-col"
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="h-48 w-full object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold text-[#3e2c23] mb-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-[#7b5d4a]">by {book.author}</p>
                    <p className="text-sm text-[#a67c52] mb-2">{book.genre}</p>
                    <p className="text-lg font-bold text-[#f97316] mb-2">
                      {(book.price || 0) * (book.quantity || 1)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() =>
                          updateQuantity(
                            book._id,
                            Math.max(1, (book.quantity || 1) - 1)
                          )
                        }
                        className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-all duration-200 active:scale-95"
                      >
                        <FaMinus className="text-amber-100" />
                      </button>
                      <span className="w-8 text-center text-amber-900 font-bold">
                        {book.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(book._id, (book.quantity || 1) + 1)
                        }
                        className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-all duration-200 active:scale-95"
                      >
                        <FaPlus className="text-amber-100" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(book.title)}
                      className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Total Price and Checkout */}
              <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
                <p className="text-xl font-semibold text-[#3e2c23]">
                  Total: ₹{totalPrice.toFixed(2)}
                </p>
                <button
                  onClick={() => setShowAddMoneyModal(true)}
                  className="bg-[#f97316] text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition"
                >
                  Checkout Now
                </button>
              </div>
            </>
          )}
        </div>

        {/* Razorpay Modal */}
        <AnimatePresence>
          {showAddMoneyModal && (
            <AddMoneyModal
              onClose={() => setShowAddMoneyModal(false)}
              onSuccess={handlePaymentSuccess}
              defaultAmount={totalPrice}
            />
          )}
        </AnimatePresence>
      </section>
      <Footer />
    </>
  );
};

export default CartPage;
