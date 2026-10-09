<script lang="ts">
    import Modal from './Modal.svelte';
    import { uiState } from '#lib/state/ui.svelte';
    import { posState } from '#lib/state/pos.svelte';
    import { Printer, Mail, MessageSquare, Check } from 'lucide-svelte';

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    let printed = $state(false);

    function handleDone() {
        uiState.closeModal();
    }

    function printReceipt() {
        printed = true;
        setTimeout(() => printed = false, 2000);
    }
</script>

<Modal 
    isOpen={uiState.activeModal === 'RECEIPT'} 
    onClose={handleDone} 
>
    {#if posState.lastTransaction}
    <div class="text-center mb-6">
        <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check class="w-8 h-8" />
        </div>
        <h2 class="text-2xl font-bold text-gray-800">Transaksi Berhasil</h2>
        <p class="text-gray-500">No Ref: <span class="font-bold text-gray-800">{posState.lastTransaction.reference}</span></p>
    </div>

    <!-- Mock Receipt -->
    <div class="bg-gray-50 p-6 rounded-xl border border-gray-200 font-mono text-sm mb-6 max-h-[40vh] overflow-y-auto">
        <div class="text-center mb-4">
            <p class="font-bold text-lg">TOKO DEMO POS</p>
            <p class="text-gray-500 text-xs">Jl. Contoh No. 123, Jakarta</p>
            <p class="text-gray-500 text-xs">{new Date().toLocaleString()}</p>
        </div>
        
        <div class="border-t border-dashed border-gray-300 py-3 my-3">
            {#each posState.lastTransaction.items as item}
                <div class="flex justify-between mb-1">
                    <div>
                        <p>{item.product.name}</p>
                        <p class="text-xs text-gray-500">{item.quantity} x {formatCurrency(item.product.price)}</p>
                    </div>
                    <p>{formatCurrency(item.product.price * item.quantity)}</p>
                </div>
            {/each}
        </div>

        <div class="border-t border-dashed border-gray-300 py-3 space-y-1">
            <div class="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(posState.lastTransaction.subtotal)}</span>
            </div>
            <div class="flex justify-between">
                <span>PPN 11%</span>
                <span>{formatCurrency(posState.lastTransaction.tax)}</span>
            </div>
            <div class="flex justify-between font-bold text-base mt-2">
                <span>Total</span>
                <span>{formatCurrency(posState.lastTransaction.total)}</span>
            </div>
            <div class="flex justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-dashed border-gray-300">
                <span>Metode Pembayaran</span>
                <span>{posState.lastTransaction.method}</span>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-2 gap-3 mb-6">
        <button 
            class="flex flex-col items-center justify-center gap-2 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            onclick={printReceipt}
        >
            <Printer class="w-6 h-6 text-gray-600" />
            <span class="font-medium text-gray-700">{printed ? 'Mencetak...' : 'Cetak Struk'}</span>
        </button>
        <button class="flex flex-col items-center justify-center gap-2 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <MessageSquare class="w-6 h-6 text-green-600" />
            <span class="font-medium text-gray-700">Kirim WA</span>
        </button>
    </div>

    <button 
        class="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors"
        onclick={handleDone}
    >
        Transaksi Baru
    </button>
    {:else}
    <div class="text-center py-12">
        <p class="text-gray-500">Memuat data struk...</p>
    </div>
    {/if}
</Modal>
