import { json } from '@sveltejs/kit';
import { db } from '#lib/server/db';

export function GET() {
    try {
        const stmt = db.prepare('SELECT * FROM products');
        const products = stmt.all();
        
        // Map database IDs to string for frontend state compatibility
        const mappedProducts = products.map((p: any) => ({
            ...p,
            id: p.id.toString()
        }));

        return json({ success: true, products: mappedProducts });
    } catch (error) {
        return json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
    }
}
