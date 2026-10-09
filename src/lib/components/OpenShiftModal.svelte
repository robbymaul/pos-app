<script lang="ts">
    import Modal from './Modal.svelte';
    import { uiState } from '#lib/state/ui.svelte';
    import { Banknote } from 'lucide-svelte';

    let startingCash = $state('');

    const formatCurrency = (val: string) => {
        const num = parseInt(val.replace(/\D/g, ''), 10);
        if (isNaN(num)) return '';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
    };

    function handleInput(e: Event) {
        const input = e.target as HTMLInputElement;
        const rawValue = input.value.replace(/\D/g, '');
        startingCash = rawValue;
        input.value = formatCurrency(rawValue);
    }

    function openShift() {
        uiState.closeModal();
    }
</script>

<Modal 
    isOpen={uiState.activeModal === 'OPEN_SHIFT'} 
    title="Buka Shift"
    onClose={() => uiState.openModal('LOGIN')} 
>
    <div class="space-y-6">
        <div class="flex items-center gap-3 text-blue-600 bg-blue-50 p-4 rounded-xl">
            <Banknote class="w-6 h-6" />
            <div>
                <p class="font-medium">Kasir: John Doe</p>
                <p class="text-sm opacity-80">Shift Pagi</p>
            </div>
        </div>

        <div>
            <label for="cash" class="block text-sm font-medium text-gray-700 mb-2">Modal Awal Kas (Laci Cash)</label>
            <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                <input 
                    id="cash"
                    type="text" 
                    class="w-full pl-12 pr-4 py-3 text-lg font-semibold border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    oninput={handleInput}
                />
            </div>
        </div>

        <div class="grid grid-cols-3 gap-2">
            {#each [50000, 100000, 200000] as preset}
                <button 
                    class="py-2 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                    onclick={() => {
                        startingCash = preset.toString();
                        const input = document.getElementById('cash') as HTMLInputElement;
                        if(input) input.value = formatCurrency(startingCash);
                    }}
                >
                    +{preset / 1000}k
                </button>
            {/each}
        </div>

        <button 
            class="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md disabled:opacity-50"
            disabled={!startingCash}
            onclick={openShift}
        >
            Mulai Shift
        </button>
    </div>
</Modal>
