import React, { useState } from 'react';
import { type CartItem, type PaymentResult } from './types';
import { PRODUCTS } from './constants/product-constants';
import { calculateSubtotal, calculateDeliveryFee, calculateTotal } from './utils/cartFunctions';
import { processMockPayment } from './services/payment';
import Header from './components/Header';
import CartList from './components/CartList';
import OrderSummary from './components/OrderSummary';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() =>
    PRODUCTS.map((product) => ({ product, quantity: 1 }))
  );
  const [cardNumber, setCardNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== id));
  };

  const resetCart = () => {
    setCart(PRODUCTS.map((product) => ({ product, quantity: 1 })));
    setCardNumber('');
    setPaymentResult(null);
  };

  const subtotal = calculateSubtotal(cart);
  const deliveryFee = calculateDeliveryFee(subtotal);
  const total = calculateTotal(subtotal, deliveryFee);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isProcessing || subtotal === 0 || !cardNumber.trim()) return;

    setIsProcessing(true);
    setPaymentResult(null);

    try {
      const result = await processMockPayment(cardNumber);
      setPaymentResult(result);
    } catch (err) {
      setPaymentResult({
        success: false,
        errorMessage: 'An unexpected system error occurred. Please try again.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <CartList
              cart={cart}
              subtotal={subtotal}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              resetCart={resetCart}
            />
          </div>
          <div className="lg:col-span-5">
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              isProcessing={isProcessing}
              paymentResult={paymentResult}
              handlePayment={handlePayment}
            />
          </div>
        </div>

      </main>

    </div >
  );
}