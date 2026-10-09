<script lang="ts">
    import { LayoutDashboard, TrendingUp, Users, ShoppingBag } from 'lucide-svelte';
</script>

<div class="flex-1 flex flex-col h-full bg-gray-50 p-6 overflow-y-auto">
    <div class="flex items-center gap-3 mb-6">
        <LayoutDashboard class="w-8 h-8 text-blue-600" />
        <h1 class="text-2xl font-bold text-gray-800">Dasbor Laporan</h1>
    </div>

    <div class="grid grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><TrendingUp /></div>
            <div>
                <p class="text-sm text-gray-500 font-medium">Penjualan Hari Ini</p>
                <p class="text-2xl font-bold text-gray-800">Rp 2.450.000</p>
            </div>
        </div>
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><ShoppingBag /></div>
            <div>
                <p class="text-sm text-gray-500 font-medium">Total Transaksi</p>
                <p class="text-2xl font-bold text-gray-800">45</p>
            </div>
        </div>
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center"><Users /></div>
            <div>
                <p class="text-sm text-gray-500 font-medium">Kasir Aktif</p>
                <p class="text-2xl font-bold text-gray-800">John Doe</p>
            </div>
        </div>
    </div>
</div>
