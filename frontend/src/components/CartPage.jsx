import { useState } from 'react'
import { useCart } from '../CartContext'
import { toast, ToastContainer } from 'react-toastify';
import { cartPageStyles } from '../assets/dummyStyles';


const CartPage = () => {

    const {
        cart,
        increment,
        decrement,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
    } = useCart();

    // checkout form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [note, setNote] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const handleMobileChange = (e) => {
        const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10); // limit to 10 digits
        setMobile(digitsOnly);
    };

    const isFormValid = () => {
        if (
        !name.trim() ||
        !email.trim() ||
        !address.trim() ||
        !mobile.trim() ||
        !paymentMethod.trim()
        ) {
        return false;
        }
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const phoneOk = /^[0-9]{10}$/.test(mobile.replace(/\s+/g, "")); // STRICT 10 digits
        return emailOk && phoneOk;
    };

    const processPayment = (method) => {
        if (method === "Cash on Delivery") return true;
        if (method === "Online") {
        return Math.random() < 0.75;
        }
        return false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid()) {
        toast.error("Please fill all required fields correctly.", {
            position: "top-right",
        });
        return;
        }

        if (!cart.length) {
        toast.error("Your cart is empty.", { position: "top-right" });
        return;
        }

        const paymentOk = processPayment(paymentMethod);

        if (paymentOk) {
        clearCart();

        setName("");
        setEmail("");
        setAddress("");
        setMobile("");
        setNote("");
        setPaymentMethod("");

        toast.success("Payment successful — order completed.", {
            position: "top-right",
        });
        return;
        } else {
        toast.error("Payment failed. Please try again.", {
            position: "top-right",
        });
        return;
        }
    };

    if(!cart.length) {
        return (
            <>
                <ToastContainer />

                <div className={cartPageStyles.emptyCartContainer}>
                    <div>
                        
                    </div>
                </div>
            </>
        )
    }

  return (
    <div>CartPage</div>
  )
}

export default CartPage