# Aurum Direct — Checkout App

> A secure, precious metals checkout application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.



## 1. How to Run Locally

Follow these quick commands to install dependencies, start the hot-reloading development server, or execute the unit test suite:

```bash
# 1. Install dependencies
npm install

# 2. Launch the local development server
npm run dev

# 3. Run automated unit tests
npm run test
```

---

## 2. Architectural Decisions & Key Safeguards

### State Guard Against Double-Charging

To eliminate double-charging risks during high-latency payment calls, I implemented explicit state synchronization using an `isProcessing` flag paired with reactive UI button disabling and async status feedback:

* **Immediate Lock:** Triggering submission immediately flips `isProcessing = true` prior to initiating the payment API call.
* **DOM Interaction Prevention:** Disables click/tap listeners and visually shifts the CTA into a loading state, suppressing rapid re-clicks.
* **Deterministic Reset:** Re-enables interactions only within the `finally` block post API completion.

---

## 3. Next Steps & Recommended Enhancements

- [ ] **Card Validation:** Integrate Algorithm client-side check for immediate card format verification before network transmission.
- [ ] **Expanded Test Suite:** Write more robust unit test cases edge-case error boundary testing.
- [ ] **Scalable State Management:** Migrate global store to **Zustand** or **Redux Toolkit** as the application expands.

---