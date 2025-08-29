import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
  
import NotFound from "./pages/NotFound";
import Categories from "./components/Categories";
import BookStore from "./components/BookStore";
import OnScrollTop from "./components/OnScrollTop";
import Home from "./pages/Home";
import WishList from "./components/WishList";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TeamsOfService";
import Contact from "./components/Contact";
import HelpCenter from "./components/HelpCenter";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from '@react-oauth/google';
import CartPage from "./components/CartPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GoogleOAuthProvider clientId="351869387245-fnfg9nrvo7vqglvs0vc658s5d12n2spq.apps.googleusercontent.com">
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <OnScrollTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/book" element={<BookStore />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/help-center" element={<HelpCenter />} />
    
        </Routes>
         <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
      </GoogleOAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
