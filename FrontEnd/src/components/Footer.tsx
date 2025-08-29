import {
  BookOpen,
  Heart,
  Twitter,
  Facebook,
  Instagram,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    Discover: ["Home", "Book", "Categories", "Contact Us"],
    Support: [
      "Help Center",
      "Contact Us",
      "Privacy Policy",
      "Terms of Service",
    ],
  };

  const clubs = ["Book Clubs", "Discussions", "Reviews", "Author Spotlights"];
  const author = [
    "Publish Your Book",
    "Author Tools",
    "Marketing Guide",
    "Royalties",
  ];

  // Generate proper route path
  const generatePath = (text) => {
    if (text.toLowerCase() === "home") return "/";
    return (
      "/" +
      text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
    );
  };

  return (
    <footer className="bg-deep-brown text-soft-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-reading-gold to-cozy-orange rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-soft-cream">
                  BookHaven
                </span>
              </div>
              <p className="text-soft-cream/80 mb-6 leading-relaxed">
                Your digital sanctuary for discovering, reading, and sharing
                stories that matter. Where every book finds its perfect reader,
                and every reader finds their next adventure.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://x.com/"
                  className="w-10 h-10 bg-reading-gold/20 rounded-full flex items-center justify-center hover:bg-reading-gold/30 transition-colors"
                >
                  <Twitter className="h-5 w-5 text-reading-gold" />
                </a>
                <a
                  href="https://www.facebook.com/"
                  className="w-10 h-10 bg-reading-gold/20 rounded-full flex items-center justify-center hover:bg-reading-gold/30 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-reading-gold" />
                </a>
                <a
                  href="https://www.instagram.com/accounts/login/"
                  className="w-10 h-10 bg-reading-gold/20 rounded-full flex items-center justify-center hover:bg-reading-gold/30 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-reading-gold" />
                </a>
              
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="text-xl">
                <h3 className="font-bold text-reading-gold mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        to={generatePath(link)}
                        className="text-soft-cream/80 hover:text-reading-gold transition-colors text-lg"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Book Clubs Section */}
            <div className="text-xl">
              <h3 className="font-bold text-reading-gold mb-4">Book Clubs</h3>
              <ul className="space-y-4 ">
                {clubs.map((club) => (
                  <li
                    key={club}
                    className="text-soft-cream/80 hover:text-reading-gold transition-colors text-lg "
                  >
                    {club}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-xl">
              <h3 className="font-bold text-reading-gold mb-4">For Author</h3>
              <ul className="space-y-4">
                {author.map((author) => (
                  <li
                    key={author}
                    className="text-soft-cream/80 hover:text-reading-gold transition-colors text-lg"
                  >
                    {author}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-soft-cream/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-soft-cream/60 text-sm">
              © 2025 BookHaven. Made with{" "}
              <Heart className="inline h-4 w-4 text-cozy-orange mx-1" /> for
              book lovers everywhere.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/privacy-policy"
                className="text-soft-cream/60 hover:text-reading-gold transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-soft-cream/60 hover:text-reading-gold transition-colors"
              >
                Terms Of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
