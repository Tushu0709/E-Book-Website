import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Menu, X, Heart, User, LogOut } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";
import { googleLogout } from "@react-oauth/google";
import { Button } from "./ui/button";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "../context/CartContext";

const Navigation = () => {
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);

  const { wishlist = [] } = useWishlist() || {}; // Ensure fallback to empty array
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("currentUser"));
    const gUser = JSON.parse(localStorage.getItem("googleUser"));
    setGoogleUser(gUser);
    setIsLoggedIn(!!localUser || !!gUser);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("googleUser");
    localStorage.removeItem("tempUserEmail");

    if (googleUser) {
      try {
        googleLogout();
      } catch (error) {
        console.error("Google logout error:", error);
      }
    }

    setIsLoggedIn(false);
    setGoogleUser(null);

    toast.success("Logged out successfully", {
      position: "top-right",
    });

    navigate("/login");
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Book", href: "/book" },
    { name: "Categories", href: "/categories" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-reading-gold to-cozy-orange rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <Link to="/">
              <span className="text-xl font-bold text-deep-brown">
                BookHaven
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-reading-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/cart" className="relative inline-block">
              <Button size="sm" variant="cozy" className="relative p-2">
                <CiShoppingCart className="w-6 h-6 text-[#3e2c23] hover:text-[#f97316]" />
                {cartItems?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full shadow-md animate-pulse">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/wishlist" className="relative">
              <Heart className="w-5 h-6 text-[#3e2c23] hover:text-[#f97316]" />
              {wishlist?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full shadow-md animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {isLoggedIn && googleUser ? (
              <div className="flex items-center gap-2">
                <img
                  src={googleUser.picture}
                  alt="profile"
                  className="w-7 h-7 rounded-full border border-gray-300"
                />
                <span className="text-sm font-medium text-deep-brown">
                  {googleUser.name}
                </span>
              </div>
            ) : null}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 text-white px-4 py-2 rounded hover:bg-amber-100 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 bg-gradient-to-r from-amber-600 via-amber-600 to-amber-800 text-white px-4 py-2 rounded hover:bg-amber-100 transition"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                <Link to="/wishlist" className="flex-1 flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Favorites
                </Link>
              </div>

              {isLoggedIn && googleUser ? (
                <div className="flex items-center gap-2 px-2">
                  <img
                    src={googleUser.picture}
                    alt="profile"
                    className="w-6 h-6 rounded-full border"
                  />
                  <span className="text-sm text-deep-brown font-medium">
                    {googleUser.name}
                  </span>
                </div>
              ) : null}

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="block bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 w-40 text-center text-white px-4 py-2 rounded hover:bg-amber-100 transition"
                >
                  <LogOut className="inline w-4 h-4 mr-1" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 w-40 text-center text-white px-4 py-2 rounded hover:bg-amber-100 transition"
                >
                  <User className="inline w-4 h-4 mr-1" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
