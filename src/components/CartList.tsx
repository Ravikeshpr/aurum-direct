import { ShoppingCart, RefreshCw, Minus, Plus, Trash2, ShieldCheck } from 'lucide-react';
import { type CartItem } from '../types';
import { FREE_DELIVERY_THRESHOLD } from '../constants/product-constants';

interface CartListProps {
    cart: CartItem[];
    subtotal: number;
    updateQuantity: (id: string, delta: number) => void;
    removeItem: (id: string) => void;
    resetCart: () => void;
}

export default function CartList({
    cart,
    subtotal,
    updateQuantity,
    removeItem,
    resetCart,
}: CartListProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-white-400" /> Your Shopping Cart
                </h2>
                <button
                    onClick={resetCart}
                    className="text-xs text-slate-400 hover:text-white-400 flex items-center gap-1 transition-colors"
                    title="Reset to default items"
                >
                    <RefreshCw className="w-3 h-3" /> Reset Cart
                </button>
            </div>

            {cart.length === 0 ? (
                <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
                    <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 font-medium">Your cart is empty.</p>
                    <button
                        onClick={resetCart}
                        className="mt-4 px-4 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                    >
                        Reload Default Products
                    </button>
                </div>
            ) : (
                <ul className="space-y-3" aria-label="Shopping Cart Items">
                    {cart.map((item) => (
                        <li
                            key={item.product.id}
                            className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 hover:border-slate-700 transition flex items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-3">
                                <div>
                                    <h3 className="font-semibold text-slate-200">{item.product.name}</h3>
                                    <p className="text-xs text-slate-400">${item.product.price} AUD each</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center bg-slate-950 rounded-lg border border-slate-800 p-1">
                                    <button
                                        onClick={() => updateQuantity(item.product.id, -1)}
                                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition focus:outline-none focus:ring-1 focus:ring-white-400"
                                        aria-label={`Decrease quantity of ${item.product.name}`}
                                    >
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span
                                        className="px-3 text-xs font-semibold text-slate-200 min-w-8 text-center"
                                        aria-label={`Quantity: ${item.quantity}`}
                                    >
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.product.id, 1)}
                                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition focus:outline-none focus:ring-1 focus:ring-white-900"
                                        aria-label={`Increase quantity of ${item.product.name}`}
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <span className="text-sm font-semibold text-slate-100 min-w-18 text-right">
                                    ${(item.product.price * item.quantity).toLocaleString()}
                                </span>

                                <button
                                    onClick={() => removeItem(item.product.id)}
                                    className="p-1.5 text-slate-500 hover:text-red-400 cursor-pointer"
                                    aria-label={`Remove ${item.product.name} from cart`}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </li>
                    ))
                    }
                </ul >
            )}

            <div className="p-4 rounded-xl bg-white-500/5 border border-white-500/20 text-xs text-white-200 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                <div>
                    <p className="font-semibold text-green-500">Insured Vault Delivery</p>
                    <p className="text-yellow-300/80">
                        {subtotal >= FREE_DELIVERY_THRESHOLD
                            ? <span className='text-green-300/80'>✓ You qualified for FREE Insured Delivery!</span>
                            : <span>Add ${(FREE_DELIVERY_THRESHOLD - subtotal).toLocaleString()} more to unlock FREE Insured Delivery.
                            </span>}
                    </p>
                </div>
            </div>
        </div >
    );
}