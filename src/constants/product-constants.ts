import { type Product } from '../types';

export const PRODUCTS: Product[] = [
    { id: '1', name: '5 g Gold Bar', price: 720, unit: 'bar', metal: 'gold' },
    { id: '2', name: '10 oz Silver Bar', price: 590, unit: 'bar', metal: 'silver' },
    { id: '3', name: '1 oz Silver Coin', price: 65, unit: 'coin', metal: 'silver' },
];

export const FREE_DELIVERY_THRESHOLD = 1000;
export const INSURED_DELIVERY_FEE = 25;