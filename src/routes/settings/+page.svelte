<script lang="ts">
    import { Settings, Printer, Percent, Users, MonitorSmartphone } from 'lucide-svelte';
</script>

<div class="flex-1 flex flex-col h-full bg-gray-50 p-6 overflow-y-auto">
    <div class="flex items-center gap-3 mb-6">
        <Settings class="w-8 h-8 text-blue-600" />
        <h1 class="text-2xl font-bold text-gray-800">Pengaturan</h1>
    </div>

    <div class="grid grid-cols-2 gap-6">
        <button class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-4 hover:border-blue-500 hover:shadow-md transition-all text-center">
            <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <Printer class="w-8 h-8" />
            </div>
            <div>
                <h3 class="font-bold text-gray-800 text-lg">Printer & Struk</h3>
                <p class="text-sm text-gray-500">Konfigurasi printer termal 58/80mm</p>
            </div>
        </button>

        <button class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-4 hover:border-blue-500 hover:shadow-md transition-all text-center">
            <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <Percent class="w-8 h-8" />
            </div>
            <div>
                <h3 class="font-bold text-gray-800 text-lg">Pajak & Layanan</h3>
                <p class="text-sm text-gray-500">Pengaturan PPN dan service charge</p>
            </div>
        </button>

        <button class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-4 hover:border-blue-500 hover:shadow-md transition-all text-center">
            <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <Users class="w-8 h-8" />
            </div>
            <div>
                <h3 class="font-bold text-gray-800 text-lg">Pengguna & Peran</h3>
                <p class="text-sm text-gray-500">Kelola kasir, supervisor, admin</p>
            </div>
        </button>

        <button class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-4 hover:border-blue-500 hover:shadow-md transition-all text-center">
            <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <MonitorSmartphone class="w-8 h-8" />
            </div>
            <div>
                <h3 class="font-bold text-gray-800 text-lg">Perangkat</h3>
                <p class="text-sm text-gray-500">Profil tablet dan pengaturan lokal</p>
            </div>
        </button>
    </div>
</div>
