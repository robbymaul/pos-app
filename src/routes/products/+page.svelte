<script lang="ts">
    import { LayoutGrid, Plus } from 'lucide-svelte';
    import { posState } from '#lib/state/pos.svelte';

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };
</script>

<div class="flex-1 flex flex-col h-full bg-gray-50 p-6 overflow-y-auto">
    <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
            <LayoutGrid class="w-8 h-8 text-blue-600" />
            <h1 class="text-2xl font-bold text-gray-800">Manajemen Produk</h1>
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <Plus class="w-5 h-5" />
            Tambah Produk
        </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                    <th class="p-4 font-medium">SKU</th>
                    <th class="p-4 font-medium">Nama Produk</th>
                    <th class="p-4 font-medium">Kategori</th>
                    <th class="p-4 font-medium">Harga</th>
                    <th class="p-4 font-medium">Stok</th>
                    <th class="p-4 font-medium">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {#each posState.products as product}
                    <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td class="p-4 text-gray-500">{product.sku}</td>
                        <td class="p-4 font-medium text-gray-800">{product.name}</td>
                        <td class="p-4">
                            <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">{product.category}</span>
                        </td>
                        <td class="p-4">{formatCurrency(product.price)}</td>
                        <td class="p-4 text-green-600 font-medium">Tersedia</td>
                        <td class="p-4">
                            <button class="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Edit</button>
                            <button class="text-red-500 hover:text-red-700 text-sm font-medium">Hapus</button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
