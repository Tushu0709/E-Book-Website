import { useState, ChangeEvent, FormEvent } from "react";
import { X, Loader2, Banknote } from "lucide-react";
import { motion } from "framer-motion";

interface AddMoneyModalProps {
  onClose: () => void;
  onSuccess: (paymentId: string, amount: number) => void;
  defaultAmount?: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const AddMoneyModal: React.FC<AddMoneyModalProps> = ({
  onClose,
  onSuccess,
  defaultAmount = 0,
}) => {
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [customAmount, setCustomAmount] = useState<string>(
    defaultAmount.toString()
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");

    try {
      const res = await loadRazorpayScript();
      if (!res) {
        setError("Payment gateway failed to load. Please try again.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: "rzp_test_fbUlZhYwn46TsO",
        amount: amount * 100,
        currency: "INR",
        name: "My App Wallet",
        description: "Wallet Recharge",
        image: "https://yourcdn.com/logo.png",
        handler: (response: { razorpay_payment_id: string }) => {
          console.log("Payment success:", response);
          onSuccess(response.razorpay_payment_id, amount);
          onClose();
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "009999999",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", (response: any) => {
        setError("Payment failed: " + response.error.description);
        console.error("Payment failed:", response.error);
      });
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Error processing payment");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCustomAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCustomAmount(value);
    setAmount(value ? parseInt(value) : 0);
    setError("");
  };

  const formatAmount = (value: string) => {
    if (!value) return "";
    return parseInt(value).toLocaleString("en-IN");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-xl"
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Total Amount</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-all"
            disabled={isProcessing}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handlePayment} className="p-5">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Amount (₹)
            </label>

            <div className="relative">
              <input
                type="text"
                value={formatAmount(customAmount)}
                onChange={handleCustomAmountChange}
                placeholder="Enter custom amount"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg font-medium"
              />
              {customAmount && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomAmount("");
                    setAmount(0);
                    setError("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={amount < 10 || isProcessing}
            className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center ${
              amount >= 10
                ? "bg-blue-600 hover:bg-blue-700 shadow"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              `Pay ₹${amount > 0 ? amount.toLocaleString() : "0"}`
            )}
          </button>
        </form>

        <div className="px-5 pb-5">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Banknote className="w-4 h-4 text-gray-400" />
            <span>Secure payment powered by Razorpay</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddMoneyModal;
