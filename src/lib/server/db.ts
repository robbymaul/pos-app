import Database from 'better-sqlite3';

const db = new Database('pos.db');

// Inisialisasi tabel jika belum ada
db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sku TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        category TEXT NOT NULL,
        stock INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reference TEXT UNIQUE NOT NULL,
        total INTEGER NOT NULL,
        method TEXT NOT NULL,
        cashier TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS transaction_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        transaction_id INTEGER,
        product_id INTEGER,
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL,
        FOREIGN KEY(transaction_id) REFERENCES transactions(id),
        FOREIGN KEY(product_id) REFERENCES products(id)
    );
`);

// Seed data awal jika tabel products kosong
const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (count.count === 0) {
    const insert = db.prepare('INSERT INTO products (sku, name, price, category, stock) VALUES (?, ?, ?, ?, ?)');
    insert.run('ITM001', 'Nasi Goreng Spesial', 25000, 'Makanan', 50);
    insert.run('ITM002', 'Mie Goreng Seafood', 28000, 'Makanan', 30);
    insert.run('ITM003', 'Es Teh Manis', 5000, 'Minuman', 100);
    insert.run('ITM004', 'Kopi Susu Gula Aren', 18000, 'Minuman', 50);
    insert.run('ITM005', 'Kerupuk Udang', 3000, 'Cemilan', 200);
}

export { db };
