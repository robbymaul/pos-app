<script lang="ts">
    import Modal from './Modal.svelte';
    import { uiState } from '#lib/state/ui.svelte';
    import { posState } from '#lib/state/pos.svelte';
    import { CheckCircle2, Loader2 } from 'lucide-svelte';

    let status = $state<'waiting' | 'success'>('waiting');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    $effect(() => {
        if (uiState.activeModal === 'PAYMENT_QRIS') {
            status = 'waiting';
            // Simulate QRIS payment success after 3 seconds for prototyping
            const timer = setTimeout(async () => {
                if (uiState.activeModal === 'PAYMENT_QRIS') {
                    await posState.checkout('QRIS', 'John Doe');
                    status = 'success';
                    setTimeout(() => {
                        uiState.openModal('RECEIPT');
                    }, 1500);
                }
            }, 3000);

            return () => clearTimeout(timer);
        }
    });
</script>

<Modal 
    isOpen={uiState.activeModal === 'PAYMENT_QRIS'} 
    title="Pembayaran QRIS"
    onClose={() => uiState.openModal('PAYMENT_METHODS')} 
>
    <div class="text-center space-y-6 flex flex-col items-center">
        <div>
            <p class="text-gray-500 mb-1">Total Tagihan</p>
            <p class="text-3xl font-bold text-gray-800">{formatCurrency(posState.total)}</p>
        </div>

        {#if status === 'waiting'}
            <div class="p-4 bg-white border-2 border-gray-100 rounded-2xl shadow-sm">
                <!-- Placeholder for actual QR code -->
                <div class="w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center border-4 border-white shadow-inner">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=QRIS_MOCK_PAYMENT" alt="QRIS Code" class="w-full h-full object-contain rounded-lg" />
                </div>
            </div>

            <div class="flex items-center justify-center gap-2 text-blue-600">
                <Loader2 class="w-5 h-5 animate-spin" />
                <span class="font-medium">Menunggu pembayaran...</span>
            </div>
        {:else}
            <div class="py-12 flex flex-col items-center gap-4">
                <CheckCircle2 class="w-24 h-24 text-green-500" />
                <h3 class="text-2xl font-bold text-gray-800">Pembayaran Berhasil!</h3>
                <p class="text-gray-500">Meneruskan ke struk...</p>
            </div>
        {/if}
    </div>
</Modal>
