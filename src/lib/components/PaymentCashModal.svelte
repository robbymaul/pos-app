<script lang="ts">
    import Modal from './Modal.svelte';
    import { uiState } from '#lib/state/ui.svelte';
    import { posState } from '#lib/state/pos.svelte';
    import { Delete } from 'lucide-svelte';

    let received = $state('0');
    let error = $state('');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    let receivedNum = $derived(parseInt(received, 10) || 0);
    let change = $derived(receivedNum - posState.total);
    let isSufficient = $derived(receivedNum >= posState.total);

    const keys = [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9',
        '00', '0', 'del'
    ];

    function handleKey(key: string) {
        error = '';
        if (key === 'del') {
            received = received.slice(0, -1) || '0';
        } else {
            if (received === '0') received = key;
            else received += key;
        }
    }

    async function processPayment() {
        if (isSufficient) {
            await posState.checkout('TUNAI', 'John Doe');
            uiState.openModal('RECEIPT');
        } else {
            error = 'Uang tidak cukup!';
        }
    }

    $effect(() => {
        if (uiState.activeModal === 'PAYMENT_CASH') {
            received = '0'; // Reset when opened
        }
    });
</script>

<Modal 
    isOpen={uiState.activeModal === 'PAYMENT_CASH'} 
    title="Pembayaran Tunai"
    onClose={() => uiState.openModal('PAYMENT_METHODS')} 
>
    <div class="flex gap-6">
        <!-- Left: Summary -->
        <div class="flex-1 space-y-4">
            <div class="p-4 bg-gray-50 rounded-xl">
                <p class="text-sm text-gray-500 mb-1">Total Tagihan</p>
                <p class="text-3xl font-bold text-gray-800">{formatCurrency(posState.total)}</p>
            </div>

            <div class="p-4 border-2 border-blue-100 bg-blue-50/50 rounded-xl">
                <p class="text-sm text-gray-500 mb-1">Uang Diterima</p>
                <p class="text-3xl font-bold text-blue-600">{formatCurrency(receivedNum)}</p>
            </div>

            <div class="p-4 rounded-xl {isSufficient ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-400'}">
                <p class="text-sm mb-1">Kembalian</p>
                <p class="text-2xl font-bold">{isSufficient ? formatCurrency(change) : 'Rp 0'}</p>
            </div>

            {#if error}
                <p class="text-red-500 text-sm font-medium">{error}</p>
            {/if}

            <button 
                class="w-full py-4 rounded-xl font-bold text-lg transition-colors shadow-md disabled:opacity-50 {isSufficient ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500'}"
                disabled={!isSufficient}
                onclick={processPayment}
            >
                Selesaikan Pembayaran
            </button>
        </div>

        <!-- Right: Numpad -->
        <div class="w-[280px]">
            <div class="grid grid-cols-2 gap-2 mb-4">
                <button class="py-2 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200" onclick={() => received = posState.total.toString()}>Uang Pas</button>
                <button class="py-2 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200" onclick={() => received = '50000'}>50.000</button>
                <button class="py-2 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200" onclick={() => received = '100000'}>100.000</button>
                <button class="py-2 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200" onclick={() => received = '200000'}>200.000</button>
            </div>

            <div class="grid grid-cols-3 gap-3">
                {#each keys as key}
                    {#if key === 'del'}
                        <button 
                            class="h-16 flex items-center justify-center text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl active:bg-gray-200 transition-colors"
                            onclick={() => handleKey(key)}
                        >
                            <Delete class="w-6 h-6" />
                        </button>
                    {:else}
                        <button 
                            class="h-16 text-xl font-bold text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-xl active:bg-gray-200 transition-colors"
                            onclick={() => handleKey(key)}
                        >
                            {key}
                        </button>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
</Modal>
