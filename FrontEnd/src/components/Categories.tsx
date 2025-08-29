import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import Footer from "./Footer";
import Navigation from "./Navigation";
import CategoryGrid from "./CategoryGrid";

// Icon mapping

// Fetch categories from backend
const getCategory = async () => {
  const res = await axios.get("http://localhost:5000/api/category");
  return res.data;
};

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const zoomCard = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const Categories = () => {
  const [cat, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategory();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navigation />

      {/* Header Section */}
      <motion.section
        className="py-20 bg-soft-cream lg:mt-12 mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-reading-gold/20 rounded-full px-4 py-2 mb-6">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-deep-brown font-medium">
                Every Mood, Every Moment
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-deep-brown mb-6">
              Find Your Perfect
              <span className="block text-transparent bg-gradient-to-r from-cozy-orange to-reading-gold bg-clip-text">
                Reading Adventure
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're seeking escapism, knowledge, or inspiration, our
              carefully curated categories help you discover exactly what your
              heart desires
            </p>
          </div>

          {/* Categories Grid */}
          <CategoryGrid />

          {/* Community Message */}
          <motion.div
            className="mt-16 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-warm-amber/20 to-reading-gold/20 rounded-2xl p-8 max-w-3xl mx-auto border border-reading-gold/30">
              <h3 className="text-2xl font-bold text-deep-brown mb-3">
                Can't find what you're looking for?
              </h3>
              <p className="text-muted-foreground mb-4">
                Our community is here to help! Share what you're craving to
                read, and fellow book lovers will point you in the right
                direction.
              </p>
              <div className="text-sm text-deep-brown/80">
                💡 <strong>Pro tip:</strong> Use our smart search to discover
                books by mood, theme, or even the feeling you want to
                experience!
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Reader’s Hub */}
      <motion.section
        className="bg-[#fffaf0] py-20 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-deep-brown mb-4"
            variants={fadeInUp}
          >
            📚 Reader’s Hub
          </motion.h2>
          <motion.p
            className="text-muted-foreground mb-10 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            See what fellow readers are loving! Book ratings, reviews, and
            trending picks — all in one place.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-6">
            {["The Midnight Library", "Atomic Habits", "It Ends With Us"].map(
              (title, i) => (
                <motion.div
                  key={title}
                  variants={zoomCard}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="p-6 shadow-md">
                    <h4 className="font-semibold text-lg text-cozy-orange">
                      “{title}”
                    </h4>
                    <p className="text-muted-foreground text-sm mt-2">
                      {i === 0
                        ? "✨ “Absolutely magical. 5 stars!” - Priya"
                        : i === 1
                        ? "💡 “Changed how I live my life.” - Raghav"
                        : "💔 “Raw and powerful storytelling.” - Sneha"}
                    </p>
                  </Card>
                </motion.div>
              )
            )}
          </div>
        </div>
      </motion.section>

      {/* Top 5 Trending */}
      <motion.section
        className="bg-[#fffaf0] py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="lg:text-5xl text-3xl font-bold text-deep-brown mb-12"
            variants={fadeInUp}
          >
            🔥 Top 5 Trending Books
          </motion.h2>
          <motion.ol
            className="space-y-6 text-left"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              "The Midnight Library",
              "Atomic Habits",
              "It Ends With Us",
              "The Subtle Art of Not Giving a F*ck",
              "Where the Crawdads Sing",
            ].map((title, idx) => (
              <motion.li
                key={title}
                className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
                variants={fadeRight}
              >
                <span className="text-xl font-semibold text-deep-brown">
                  {idx + 1}. {title}
                </span>
                <span className="text-reading-gold font-bold">
                  ⭐ {Math.floor(Math.random() * 1000)}+ reads
                </span>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </motion.section>

      <Footer />
    </>
  );
};

export default Categories;
