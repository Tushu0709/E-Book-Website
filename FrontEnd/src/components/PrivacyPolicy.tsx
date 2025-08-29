import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navigation from "./Navigation";
import Footer from "./Footer";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const PrivacyPolicy = () => {
  return (
    <>
      <Navigation />

      <section className="py-14 px-6 bg-[#fffaf0] min-h-screen lg:mt-12">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-center text-[#3e2c23]  text-4xl md:text-5xl font-bold text-deep-brown mb-10"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Privacy Policy
          </motion.h1>

         

          <motion.div 
            className="bg-white p-8 rounded-lg shadow-md border border-[#fcd34d]/40"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <div className="space-y-6 text-[#5A4636]">
              <section>
                <h2 className="text-2xl font-bold text-[#3e2c23] mb-3">1. Introduction</h2>
                <p className="mb-4">
                  Welcome to our EBook store. We are committed to protecting your personal 
                  information and your right to privacy. If you have any questions or concerns 
                  about this privacy notice or our practices with regard to your personal 
                  information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#3e2c23] mb-3">2. Information We Collect</h2>
                <p className="mb-4">
                  We collect personal information that you voluntarily provide to us when you 
                  register on the website, express an interest in obtaining information about 
                  us or our products and services, or otherwise when you contact us.
                </p>
                <p className="mb-4">
                  The personal information we collect may include:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Name and contact data (email address, phone number)</li>
                  <li>Payment information (credit card details, billing address)</li>
                  <li>Download history and reading preferences</li>
                  <li>Device and usage information (IP address, browser type)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#3e2c23] mb-3">3. How We Use Your Information</h2>
                <p className="mb-4">
                  We use personal information collected via our website for a variety of business 
                  purposes described below:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>To facilitate account creation and logon process</li>
                  <li>To process and fulfill your orders</li>
                  <li>To send administrative information to you</li>
                  <li>To protect our services and prevent fraud</li>
                  <li>To recommend personalized content and book suggestions</li>
                  <li>For other business purposes like data analysis and audits</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#3e2c23] mb-3">4. Sharing Your Information</h2>
                <p className="mb-4">
                  We only share information with your consent, to comply with laws, to provide 
                  you with services, to protect your rights, or to fulfill business obligations.
                </p>
                <p className="mb-4">
                  We may process or share your data that we hold based on the following legal basis:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>With payment processors to complete transactions</li>
                  <li>With cloud storage providers to store your data securely</li>
                  <li>With analytics providers to understand usage patterns</li>
                  <li>When required by law or to respond to legal process</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#3e2c23] mb-3">5. Cookies and Tracking</h2>
                <p className="mb-4">
                  We use cookies and similar tracking technologies to access or store information. 
                  Specific information about how we use such technologies and how you can refuse 
                  certain cookies is set out in our Cookie Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#3e2c23] mb-3">6. Data Retention</h2>
                <p className="mb-4">
                  We will only keep your personal information for as long as it is necessary 
                  for the purposes set out in this privacy policy, unless a longer retention 
                  period is required or permitted by law.
                </p>
              </section>

            

              <section>
             
                <Button 
                  variant="warm" 
                  className="mt-6"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Back to Top
                </Button>
              </section>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;