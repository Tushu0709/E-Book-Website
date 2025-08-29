import { Button } from "@/components/ui/button";
import { Search, Heart, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-books.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { label: "Free Books", value: "75,000+" },
  { label: "Genres", value: "50+" },
  { label: "Happy Readers", value: "1M+" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 1 } },
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-10 bg-[#2b1d1a] text-white">
      {/* Background Image with Soft Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Cozy reading atmosphere"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2b1d1a]/90 via-[#5b3a2b]/70 to-transparent"></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className=" py-12">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="inline-flex items-center gap-2 bg-[#f4b860]/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-md"
          >
            <Heart className="h-5 w-5 text-[#f97316]" />
            <span className="text-[#fff4e6] font-medium">
              Welcome to Book Haven
            </span>
          </motion.div>

          {/* Hero Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="text-5xl md:text-7xl font-bold text-[#fff9f4] leading-tight mb-6"
          >
            Discover Stories That
            <span className="block bg-gradient-to-r from-[#fbbf24] via-[#f97316] to-[#fb923c] text-transparent bg-clip-text drop-shadow-md">
              Touch Your Soul
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-xl md:text-2xl text-[#fefae0]/90 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Journey into tales that inspire, connect, and resonate. Every page
            is a promise of warmth, wonder, and connection.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          className="mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5b3a2b]/60 h-5 w-5" />
            <input
              type="text"
              placeholder="What story calls to you today?"
              className="w-full pl-12 pr-4 py-4 rounded-full bg-[#fff9f4]/90 backdrop-blur-sm border border-[#fcd34d]/40 text-[#3e2c23] placeholder-[#3e2c23]/60 focus:outline-none focus:ring-2 focus:ring-[#facc15] transition-all duration-300 text-lg shadow-sm"
            />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <Button
            variant="warm"
            size="lg"
            className="group bg-[#f97316] hover:bg-[#fb923c] text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
          >
            <BookOpen className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Start Your Journey
          </Button>
          <Link to="/book">
            <Button
              variant="cozy"
              size="lg"
              className="bg-[#fbbf24] hover:bg-[#fcd34d] text-[#3e2c23] font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
            >
              Browse Collections
            </Button>
          </Link>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto text-[#fffaf0]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.25,
              },
            },
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2 + i * 0.3 }}
              whileHover={{ scale: 1.08 }}
            >
              <div className="text-3xl font-bold text-[#fcd34d] mb-2 transition-transform">
                {stat.value}
              </div>
              <div className="text-[#fefae0]/80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
