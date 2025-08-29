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

const TermsOfService = () => {
  return (
    <>
      <Navigation />

      <section className="py-14 px-6 bg-[#fffaf0] min-h-screen lg:mt-12">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-center text-[#3e2c23] text-4xl md:text-5xl font-bold text-deep-brown mb-10"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Terms of Service
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
                <h2 className="text-2xl font-bold text-[#3e2c23] mb-3">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing or using our EBook store ("Service"), you agree to be bound by these Terms of Service.
                  If you do not agree to all the terms and conditions, you may not access or use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#3e2c23] mb-3">2. Description of Service</h2>
                <p className="mb-4">
                  Our Service provides users with access to a collection of digital books ("EBooks") for purchase
                  and download. The Service may include features such as personalized recommendations,
                  reading progress tracking, and cloud storage for your purchased EBooks.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#3e2c23] mb-3">3. User Accounts</h2>
                <p className="mb-4">
                  To access certain features of the Service, you must create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and accept all risks of unauthorized access</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Be responsible for all activities that occur under your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#3e2c23] mb-3">4. Purchases and Payments</h2>
                <p className="mb-4">
                  All purchases are subject to the following terms:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Prices are displayed in your local currency (if available) and are subject to change</li>
                  <li>Payment must be completed before EBooks are made available for download</li>
                  <li>All sales are final - we do not offer refunds for purchased EBooks</li>
                  <li>You are responsible for any taxes associated with your purchase</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#3e2c23] mb-3">5. License and Usage</h2>
                <p className="mb-4">
                  Upon purchase, we grant you a limited, non-exclusive, non-transferable license to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Download and view the EBook for personal, non-commercial use</li>
                  <li>Store the EBook on your personal devices and our cloud storage</li>
                  <li>Access the EBook through your account on multiple devices</li>
                </ul>
                <p className="mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Reproduce, distribute, or publicly display the EBook</li>
                  <li>Modify, adapt, or create derivative works from the EBook</li>
                  <li>Remove any copyright or proprietary notices</li>
                  <li>Share your account or EBooks with others</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#3e2c23] mb-3">6. Intellectual Property</h2>
                <p className="mb-4">
                  All content included in the Service, including EBooks, text, graphics, logos, and software,
                  is the property of our company or our content providers and protected by copyright laws.
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

export default TermsOfService;