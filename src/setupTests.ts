import '@testing-library/jest-dom'
import '@testing-library/jest-dom/vitest';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
    // Overload the new Vitest 5 Assertion signature
    interface Assertion<R, T> extends TestingLibraryMatchers<typeof expect.stringContaining, R> { }
}