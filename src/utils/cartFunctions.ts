import { type CartItem } from '../types';
import { FREE_DELIVERY_THRESHOLD, INSURED_DELIVERY_FEE } from '../constants/product-constants';

export const calculateSubtotal = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

export const calculateDeliveryFee = (subtotal: number): number => {
    if (subtotal === 0) return 0;
    return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : INSURED_DELIVERY_FEE;
};

export const calculateTotal = (subtotal: number, deliveryFee: number): number => {
    return subtotal + deliveryFee;
};