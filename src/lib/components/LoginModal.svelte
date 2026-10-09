<script lang="ts">
    import Modal from './Modal.svelte';
    import { uiState } from '#lib/state/ui.svelte';
    import { Delete } from 'lucide-svelte';

    let pin = $state('');
    let error = $state(false);

    const keys = [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9',
        '', '0', 'del'
    ];

    function handleKey(key: string) {
        error = false;
        if (key === 'del') {
            pin = pin.slice(0, -1);
        } else if (key !== '' && pin.length < 4) {
            pin += key;
            if (pin.length === 4) {
                // Simulate login
                if (pin === '1234') {
                    uiState.openModal('OPEN_SHIFT');
                    pin = '';
                } else {
                    error = true;
                    setTimeout(() => { pin = ''; error = false; }, 1000);
                }
            }
        }
    }
</script>

<Modal 
    isOpen={uiState.activeModal === 'LOGIN'} 
    onClose={() => {}} 
>
    <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Masuk Kasir</h2>
        <p class="text-gray-500 mb-8">Masukkan PIN 4 digit Anda (1234)</p>

        <div class="flex justify-center gap-4 mb-8">
            {#each Array(4) as _, i}
                <div class="w-4 h-4 rounded-full {pin.length > i ? 'bg-blue-600' : 'bg-gray-200'} {error ? 'bg-red-500 animate-pulse' : ''} transition-colors"></div>
            {/each}
        </div>

        <div class="grid grid-cols-3 gap-4 max-w-[280px] mx-auto">
            {#each keys as key}
                {#if key === ''}
                    <div></div>
                {:else if key === 'del'}
                    <button 
                        class="h-16 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-2xl active:bg-gray-200 transition-colors"
                        onclick={() => handleKey(key)}
                    >
                        <Delete class="w-6 h-6" />
                    </button>
                {:else}
                    <button 
                        class="h-16 text-2xl font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-2xl active:bg-gray-200 transition-colors"
                        onclick={() => handleKey(key)}
                    >
                        {key}
                    </button>
                {/if}
            {/each}
        </div>
    </div>
</Modal>
