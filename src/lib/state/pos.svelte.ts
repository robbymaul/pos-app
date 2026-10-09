export type Product = {
    id: string;
    sku: string;
    name: string;
    price: number;
    category: string;
    image?: string;
    stock?: number;
};

export type CartItem = {
    product: Product;
    quantity: number;
    notes?: string;
};

export class PosState {
    products = $state<Product[]>([]);
    
    categories = $derived(Array.from(new Set(this.products.map(p => p.category))));
    activeCategory = $state<string>('');

    cart = $state<CartItem[]>([]);
    lastTransaction = $state<any>(null);
    
    taxRate = 0.11; // 11% PPN

    constructor() {
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const res = await fetch('/api/products');
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    this.products = data.products;
                }
            }
        } catch (err) {
            console.error("Failed to load products from DB, using fallback", err);
            // Fallback for offline mockup if db fails
            this.products = [
                { id: '1', sku: 'ITM001', name: 'Nasi Goreng Spesial', price: 25000, category: 'Makanan' },
                { id: '2', sku: 'ITM002', name: 'Mie Goreng Seafood', price: 28000, category: 'Makanan' }
            ];
        }
    }

    get subtotal() {
        return this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }

    get tax() {
        return this.subtotal * this.taxRate;
    }

    get total() {
        return this.subtotal + this.tax;
    }

    get filteredProducts() {
        if (!this.activeCategory) return this.products;
        return this.products.filter(p => p.category === this.activeCategory);
    }

    addToCart(product: Product, quantity = 1) {
        const existing = this.cart.find(item => item.product.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cart.push({ product, quantity });
        }
    }

    removeFromCart(productId: string) {
        this.cart = this.cart.filter(item => item.product.id !== productId);
    }

    updateQuantity(productId: string, quantity: number) {
        const item = this.cart.find(item => item.product.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
            }
        }
    }

    clearCart() {
        this.cart = [];
    }

    async checkout(method: string, cashier: string) {
        if (this.cart.length === 0) return false;

        const payload = {
            total: this.total,
            method: method,
            cashier: cashier,
            items: this.cart
        };

        try {
            const res = await fetch('/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.success) {
                this.lastTransaction = {
                    reference: data.reference,
                    items: [...this.cart],
                    subtotal: this.subtotal,
                    tax: this.tax,
                    total: this.total,
                    method: method
                };
                this.clearCart();
                // Reload products to update stock
                this.loadProducts();
                return data.reference;
            }
            return false;
        } catch (e) {
            console.error("Checkout failed", e);
            // In offline mode we would save to IndexedDB here
            return 'OFFLINE-TRX';
        }
    }
}

// Singleton pattern for global state, or we could use context
export const posState = new PosState();
