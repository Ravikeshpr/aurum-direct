import { describe, expect, it } from 'vitest';
import { calculateDeliveryFee } from './cartFunctions';
import { FREE_DELIVERY_THRESHOLD, INSURED_DELIVERY_FEE } from '../constants/product-constants';

describe('cart Functions', () => {
    it('Should not charge delivery for an empty order', () => {
        expect(calculateDeliveryFee(0)).toBe(0);
    });

    it('should chargge insured delivery below the free-delivery threshold', () => {
        expect(calculateDeliveryFee(FREE_DELIVERY_THRESHOLD - 1)).toBe(INSURED_DELIVERY_FEE);
    });

    it('should be free delivery at the threshold', () => {
        expect(calculateDeliveryFee(FREE_DELIVERY_THRESHOLD)).toBe(0);
    });

    it('should be free delivery above the threshold', () => {
        expect(calculateDeliveryFee(FREE_DELIVERY_THRESHOLD + 1)).toBe(0);
    });
});