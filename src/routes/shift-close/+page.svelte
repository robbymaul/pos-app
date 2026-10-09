<script lang="ts">
    import { ArrowRightLeft, Lock } from 'lucide-svelte';
</script>

<div class="flex-1 flex flex-col h-full bg-gray-50 p-6">
    <div class="flex items-center gap-3 mb-6">
        <ArrowRightLeft class="w-8 h-8 text-blue-600" />
        <h1 class="text-2xl font-bold text-gray-800">Tutup Shift</h1>
    </div>

    <div class="max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center gap-4 mb-8 bg-blue-50 p-4 rounded-lg">
            <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">JD</div>
            <div>
                <h3 class="font-bold text-gray-800 text-lg">John Doe</h3>
                <p class="text-gray-500">Mulai: Hari ini, 08:00 WIB</p>
            </div>
        </div>

        <div class="space-y-4 mb-8">
            <div class="flex justify-between p-3 border border-gray-100 rounded-lg">
                <span class="text-gray-600">Modal Awal Kas</span>
                <span class="font-bold text-gray-800">Rp 100.000</span>
            </div>
            <div class="flex justify-between p-3 border border-gray-100 rounded-lg">
                <span class="text-gray-600">Penerimaan Tunai</span>
                <span class="font-bold text-green-600">+ Rp 850.000</span>
            </div>
            <div class="flex justify-between p-3 border border-gray-100 rounded-lg">
                <span class="text-gray-600">Penerimaan QRIS/Kartu</span>
                <span class="font-bold text-blue-600">+ Rp 1.250.000</span>
            </div>
            <div class="flex justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 text-lg">
                <span class="font-bold text-gray-800">Ekspektasi Kas Fisik</span>
                <span class="font-bold text-gray-800">Rp 950.000</span>
            </div>
        </div>

        <div class="mb-8">
            <label for="actual-cash" class="block text-sm font-bold text-gray-700 mb-2">Kas Fisik Dihitung (Laci Cash)</label>
            <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                <input 
                    id="actual-cash"
                    type="text" 
                    class="w-full pl-12 pr-4 py-3 text-lg font-bold border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan jumlah fisik"
                />
            </div>
        </div>

        <button class="w-full bg-red-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-sm">
            <Lock class="w-5 h-5" />
            Tutup Shift & Cetak Laporan
        </button>
    </div>
</div>
