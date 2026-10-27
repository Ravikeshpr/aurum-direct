import React, { useId } from 'react';
import { CreditCard, RefreshCw, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { type PaymentResult } from '../types';

interface OrderSummaryProps {
    subtotal: number;
    deliveryFee: number;
    total: number;
    cardNumber: string;
    setCardNumber: (num: string) => void;
    isProcessing: boolean;
    paymentResult: PaymentResult | null;
    handlePayment: (e: React.FormEvent) => void;
}

export default function OrderSummary({
    subtotal,
    deliveryFee,
    total,
    cardNumber,
    setCardNumber,
    isProcessing,
    paymentResult,
    handlePayment,
}: OrderSummaryProps) {
    const cardNumberId = useId();

    return (
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-100 border-b border-slate-800 pb-3">
                Order Summary
            </h2>

            <div className="space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="font-medium text-slate-200">${subtotal.toLocaleString()} AUD</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center gap-1">Insured Delivery</span>
                    <span className="font-medium">
                        {deliveryFee === 0 ? (
                            <span className="text-emerald-400 font-semibold">FREE</span>
                        ) : (
                            `$${deliveryFee} AUD`
                        )}
                    </span>
                </div>
                <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-bold text-white">
                    <span>Total AUD</span>
                    <span className="text-white-400 text-xl">${total.toLocaleString()}</span>
                </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-4 pt-4 border-t border-slate-800">
                <div>
                    <label
                        htmlFor={cardNumberId}
                        className=" text-xs font-semibold text-slate-300 mb-1.5 flex justify-between"
                    >
                        <span>Credit Card Number</span> <span className='text-yellow-100'>Enter your card number to Pay</span>
                    </label>
                    <div className="relative">
                        <input
                            id={cardNumberId}
                            type="number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4532 •••• •••• 4242"
                            disabled={isProcessing || subtotal === 0}
                            required
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white-100 text-sm placeholder-slate-600"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isProcessing || subtotal === 0 || !cardNumber.trim()}
                    className="w-full py-3 px-4  text-white-950 font-bold border border-white rounded-xl disabled:opacity-50 
                    cursor-pointer
                    disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isProcessing ? (
                        <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Authorizing Payment...</span>
                        </>
                    ) : (
                        <>
                            <Lock className="w-4 h-4" />
                            <span>Pay ${total.toLocaleString()} AUD</span>
                        </>
                    )}
                </button>
            </form>

            <div aria-live="polite" aria-atomic="true" className="text-xs">
                {paymentResult && (
                    <div
                        className={`p-4 rounded-xl border flex items-start gap-3 mt-4 ${paymentResult.success
                            ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                            : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                            }`}
                    >
                        {paymentResult.success ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                            <h4 className="font-bold">
                                {paymentResult.success ? 'Payment Approved!' : 'Payment Declined'}
                            </h4>
                            {paymentResult.success ? (
                                <p className="mt-1 text-emerald-300">
                                    Order Reference:{' '}
                                    <span className="font-mono font-semibold bg-emerald-900/50 px-1.5 py-0.5 rounded border border-emerald-700/50">
                                        {paymentResult.orderReference}
                                    </span>
                                </p>
                            ) : (
                                <p className="mt-1 text-red-300">{paymentResult.errorMessage}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}