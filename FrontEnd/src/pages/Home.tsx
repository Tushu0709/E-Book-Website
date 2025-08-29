import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedBooks from "@/components/FeaturedBooks";

import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <FeaturedBooks />

      <Footer />
    </div>
  );
};

export default Home;
