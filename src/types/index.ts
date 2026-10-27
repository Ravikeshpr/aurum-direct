export interface Product {
    id: string;
    name: string;
    price: number;
    unit: string;
    metal: 'gold' | 'silver';
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface PaymentResult {
    success: boolean;
    orderReference?: string;
    errorMessage?: string;
}