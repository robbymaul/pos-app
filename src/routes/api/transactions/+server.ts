import { json } from '@sveltejs/kit';
import { db } from '#lib/server/db';
import type { RequestEvent } from './$types';

export async function POST({ request }: RequestEvent) {
    try {
        const body = await request.json();
        const { total, method, cashier, items } = body;

        // Generate simple reference
        const reference = `TRX-${Date.now().toString().slice(-6)}`;

        // Use transaction for database integrity
        const insertTransaction = db.transaction(() => {
            const stmtTx = db.prepare('INSERT INTO transactions (reference, total, method, cashier) VALUES (?, ?, ?, ?)');
            const info = stmtTx.run(reference, total, method, cashier);
            const transactionId = info.lastInsertRowid;

            const stmtItem = db.prepare('INSERT INTO transaction_items (transaction_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
            const stmtStock = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?');

            for (const item of items) {
                stmtItem.run(transactionId, parseInt(item.product.id), item.quantity, item.product.price);
                // Kurangi stok
                stmtStock.run(item.quantity, parseInt(item.product.id));
            }

            return reference;
        });

        const ref = insertTransaction();

        return json({ success: true, reference: ref });
    } catch (error) {
        console.error(error);
        return json({ success: false, error: 'Failed to save transaction' }, { status: 500 });
    }
}

export function GET() {
    try {
        const stmt = db.prepare('SELECT * FROM transactions ORDER BY created_at DESC');
        const transactions = stmt.all();
        return json({ success: true, transactions });
    } catch (error) {
        return json({ success: false, error: 'Failed to fetch transactions' }, { status: 500 });
    }
}
