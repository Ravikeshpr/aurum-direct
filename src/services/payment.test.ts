import { afterEach, describe, it, expect, vi } from 'vitest';
import { processMockPayment } from '../services/payment';

afterEach(() => {
    vi.useRealTimers();
});

describe('process payments', () => {
    it('should return a declined result for cards ending in 0002', async () => {
        vi.useFakeTimers();

        const payment = processMockPayment('40000000000002');
        await vi.advanceTimersByTimeAsync(1500);
        const result = await payment;

        expect(result.success).toBe(false);
    });

    it('should return a Approved result for cards ending in other than 0002', async () => {
        vi.useFakeTimers();

        const payment = processMockPayment('40000000001234');
        await vi.advanceTimersByTimeAsync(1500);
        const result = await payment;

        expect(result.success).toBe(true);
        expect(result.errorMessage).toBeUndefined();
    });
});