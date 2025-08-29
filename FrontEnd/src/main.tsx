import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WishlistProvider } from "./context/WishlistContext.tsx";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CartProvider } from "./context/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <WishlistProvider>
      <GoogleOAuthProvider clientId="351869387245-fnfg9nrvo7vqglvs0vc658s5d12n2spq.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      <Toaster position="top-right" />
    </WishlistProvider>
  </CartProvider>
);
