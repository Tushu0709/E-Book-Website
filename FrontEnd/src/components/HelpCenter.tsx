// import React from "react";
// import { motion } from "framer-motion";
// import { BookOpen, User, Shield, Download, MessageCircle } from "lucide-react";
// import Navigation from "./Navigation";
// import Footer from "./Footer";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.1, duration: 0.5 },
//   }),
// };

// const helpTopics = [
//   {
//     icon: <BookOpen className="h-6 w-6 text-[#F97316]" />,
//     title: "Getting Started",
//     desc: "Learn how to create an account, explore books, and start reading.",
//   },
//   {
//     icon: <Download className="h-6 w-6 text-[#F97316]" />,
//     title: "Download Issues",
//     desc: "Having trouble downloading your books? Here's how to fix it.",
//   },
//   {
//     icon: <User className="h-6 w-6 text-[#F97316]" />,
//     title: "Account Settings",
//     desc: "Update your email, reset your password, or delete your account.",
//   },
//   {
//     icon: <Shield className="h-6 w-6 text-[#F97316]" />,
//     title: "Privacy & Security",
//     desc: "Understand how we protect your data and respect your privacy.",
//   },
//   {
//     icon: <MessageCircle className="h-6 w-6 text-[#F97316]" />,
//     title: "Contact Support",
//     desc: "Still need help? Reach out to our team directly.",
//   },
// ];

// const HelpCenter = () => {
//   return (
//     <>
//       <Navigation />

//       <section className="bg-[#fffaf0] py-20 px-6 min-h-screen text-[#3e2c23]">
//         <div className="max-w-5xl mx-auto">
//           <motion.h1
//             className="text-4xl font-bold text-center mb-4"
//             variants={fadeInUp}
//             initial="hidden"
//             animate="visible"
//             custom={0}
//           >
//             Help Center
//           </motion.h1>

//           <motion.p
//             className="text-center text-[#6b4c3b] max-w-xl mx-auto mb-12"
//             variants={fadeInUp}
//             initial="hidden"
//             animate="visible"
//             custom={1}
//           >
//             Need assistance? Explore our FAQs and helpful guides to get the most
//             out of your eBook experience.
//           </motion.p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {helpTopics.map((topic, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white border border-[#fcd34d]/40 rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300"
//                 variants={fadeInUp}
//                 initial="hidden"
//                 animate="visible"
//                 custom={index + 2}
//               >
//                 <div className="flex items-start gap-4 mb-3">
//                   {topic.icon}
//                   <h3 className="text-lg font-semibold text-[#2f1b0c]">
//                     {topic.title}
//                   </h3>
//                 </div>
//                 <p className="text-sm text-[#6b4c3b]">{topic.desc}</p>
//               </motion.div>
//             ))}
//           </div>

//           {/* CTA */}
//           <motion.div
//             className="mt-16 text-center"
//             initial="hidden"
//             animate="visible"
//             variants={fadeInUp}
//             custom={helpTopics.length + 3}
//           >
//             <h2 className="text-2xl font-bold mb-2 text-[#2f1b0c]">
//               Can’t find what you’re looking for?
//             </h2>
//             <p className="text-[#6b4c3b] mb-4">
//               Contact our support team and we’ll get back to you shortly.
//             </p>
//             <a
//               href="/contact"
//               className="inline-block bg-[#F97316] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#ea6a0c] transition"
//             >
//               Contact Support
//             </a>
//           </motion.div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default HelpCenter;



import { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

 

  const allFaqs = [
    {
      question: "How do I Login My account?",
      answer: "Click 'Login' in the top right corner and follow the prompts. You can use your email or social accounts to register.",
      category: 'account'
    },
    {
      question: "Where can I find my purchased eBooks?",
      answer: "All your purchases are available in 'My Library' which you can access from your account dashboard.",
      category: 'purchases'
    },
    {
      question: "What formats are available for download?",
      answer: "We offer  PDF formats for most titles. Some titles may have format restrictions.",
      category: 'reading'
    },
    // {
    //   question: "How do I reset my password?",
    //   answer: "Go to the login page and click 'Forgot Password'. Enter your email to receive reset instructions.",
    //   category: 'account'
    // },
    {
      question: "Can I read on my Kindle?",
      answer: "Yes! Download the PDF format and transfer it to your Kindle via USB or email it to your Kindle address.",
      category: 'devices'
    },
    // {
    //   question: "How do I update my payment method?",
    //   answer: "Navigate to 'Payment Methods' in your account settings to add or update your payment information.",
    //   category: 'billing'
    // },
    {
      question: "Why was my payment declined?",
      answer: "This could be due to insufficient funds, expired card, or bank restrictions. Contact your bank for details.",
      category: 'billing'
    },
    {
      question: "How do I use wishlist?",
      answer: "While reading, Click On Heart Icon.",
      category: 'reading'
    }
  ];

  const filteredFaqs = allFaqs.filter(faq => 
    (activeCategory === 'all' || faq.category === activeCategory) &&
    (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const popularGuides = [
    { 
      title: "Getting Started Guide", 
      description: "Complete walkthrough for new users",
      icon: "📚",
      
    },
    { 
      title: "eReader Setup", 
      description: "How to read on Kindle, Kobo, and other devices",
      icon: "📱",
      
    },
    { 
      title: "Troubleshooting", 
      description: "Fix common reading app issues",
      icon: "🔧",
    
    }
  ];

  return (
    <>
      <Navigation />

      <section className="py-28 px-4 sm:px-6 bg-[#fffaf0] min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-6 md:text-5xl text-deep-brown">Help Center</h1>
            <p className="text-lg text-[#5A4636] max-w-3xl mx-auto">
              Find instant answers to your questions or contact our support team for personalized assistance.
            </p>
          </motion.div>

       

       

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                
                  {filteredFaqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-5 rounded-lg shadow-sm border border-[#fcd34d]/40"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center text-left"
                      >
                        <h3 className="text-lg font-medium text-[#3e2c23]">
                          {faq.question}
                        </h3>
                        <svg
                          className={`h-5 w-5 text-[#5A4636] transform transition-transform ${
                            expandedFaq === index ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {expandedFaq === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.2 }}
                          className="mt-3 text-[#5A4636]"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-[#fcd34d]/40 text-center">
                  <h3 className="text-xl font-medium text-[#3e2c23] mb-2">
                    No results found
                  </h3>
                  <p className="text-[#5A4636]">
                    Try different search terms or browse our categories
                  </p>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Popular Guides */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#fcd34d]/40">
                <h3 className="text-xl font-semibold text-[#3e2c23] mb-4">
                  Popular Guides
                </h3>
                <div className="space-y-4">
                  {popularGuides.map((guide, index) => (
                    <a
                      key={index}
                      className="flex items-start p-3 rounded-lg hover:bg-[#fff5eb] transition-colors"
                    >
                      <span className="text-2xl mr-3">{guide.icon}</span>
                      <div>
                        <h4 className="font-medium text-[#3e2c23]">
                          {guide.title}
                        </h4>
                        <p className="text-sm text-[#5A4636]">
                          {guide.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#fcd34d]/40">
                <h3 className="text-xl font-semibold text-[#3e2c23] mb-4">
                  Still Need Help?
                </h3>
                <p className="text-[#5A4636] mb-4">
                  Our support team is available 24/7 to assist you with any questions or issues.
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-[#F97316] mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-[#5A4636]">support@BookHaven.com</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-[#F97316] mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-[#5A4636]">+91 9872X XXXXX</span>
                  </div>
                </div>
                <Link to="/contact-us">
                <Button  className="w-full font-bold ">
                  Contact 
                </Button>
                </Link>
              </div>

              {/* Quick Tips */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#fcd34d]/40">
                <h3 className="text-xl font-semibold text-[#3e2c23] mb-4">
                  Quick Tips
                </h3>
                <ul className="space-y-3 text-[#5A4636]">
                  <li className="flex items-start">
                    <span className="text-[#F97316] mr-2">•</span>
                    <span>Clear your browser cache if downloads fail</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F97316] mr-2">•</span>
                    <span>Check spam folder for purchase receipts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F97316] mr-2">•</span>
                    <span>Update your reading app for best performance</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HelpCenter;