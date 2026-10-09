<script lang="ts">
    import { History } from 'lucide-svelte';
    import { onMount } from 'svelte';

    let transactions = $state<any[]>([]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    onMount(async () => {
        try {
            const res = await fetch('/api/transactions');
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    transactions = data.transactions;
                }
            }
        } catch (e) {
            console.error(e);
        }
    });
</script>

<div class="flex-1 flex flex-col h-full bg-gray-50 p-6">
    <div class="flex items-center gap-3 mb-6">
        <History class="w-8 h-8 text-blue-600" />
        <h1 class="text-2xl font-bold text-gray-800">Riwayat Transaksi</h1>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                    <th class="p-4 font-medium">Waktu</th>
                    <th class="p-4 font-medium">No. Ref</th>
                    <th class="p-4 font-medium">Total</th>
                    <th class="p-4 font-medium">Metode</th>
                    <th class="p-4 font-medium">Kasir</th>
                    <th class="p-4 font-medium">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {#if transactions.length === 0}
                    <tr>
                        <td colspan="6" class="p-4 text-center text-gray-500">Belum ada transaksi</td>
                    </tr>
                {/if}
                {#each transactions as trx}
                <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td class="p-4">{new Date(trx.created_at).toLocaleString('id-ID')}</td>
                    <td class="p-4 font-medium text-blue-600">{trx.reference}</td>
                    <td class="p-4 font-bold">{formatCurrency(trx.total)}</td>
                    <td class="p-4"><span class="px-2 py-1 {trx.method === 'TUNAI' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'} rounded-md text-xs font-bold">{trx.method}</span></td>
                    <td class="p-4 text-gray-600">{trx.cashier}</td>
                    <td class="p-4">
                        <button class="text-red-500 hover:text-red-700 text-sm font-medium">Void</button>
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
