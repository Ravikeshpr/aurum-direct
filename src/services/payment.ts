import { type PaymentResult } from '../types';

export const processMockPayment = async (cardNumber: string): Promise<PaymentResult> => {

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const sanitizedCard = cardNumber.replace(/\s+/g, '');

    if (sanitizedCard.endsWith('0002')) {
        return {
            success: false,
            errorMessage: 'Payment declined: Card ending in 0002 was rejected by issuing bank.',
        };
    }

    const randomRef = 'AUR-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    return {
        success: true,
        orderReference: randomRef,
    };
};