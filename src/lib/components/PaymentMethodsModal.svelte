<script lang="ts">
    import Modal from './Modal.svelte';
    import { uiState } from '#lib/state/ui.svelte';
    import { posState } from '#lib/state/pos.svelte';
    import { Banknote, QrCode, CreditCard } from 'lucide-svelte';

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    function selectMethod(method: 'CASH' | 'QRIS' | 'CARD') {
        uiState.paymentMethod = method;
        uiState.paymentAmount = posState.total;
        
        if (method === 'CASH') {
            uiState.openModal('PAYMENT_CASH');
        } else if (method === 'QRIS') {
            uiState.openModal('PAYMENT_QRIS');
        } else {
            // Card not implemented in this phase
            alert('Fitur Kartu belum tersedia');
        }
    }
</script>

<Modal 
    isOpen={uiState.activeModal === 'PAYMENT_METHODS'} 
    title="Pilih Metode Pembayaran"
    onClose={() => uiState.closeModal()} 
>
    <div class="space-y-6">
        <div class="text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
            <p class="text-gray-500 mb-1">Total Tagihan</p>
            <p class="text-4xl font-bold text-gray-800">{formatCurrency(posState.total)}</p>
        </div>

        <div class="grid gap-3">
            <button 
                class="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                onclick={() => selectMethod('CASH')}
            >
                <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Banknote class="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <h3 class="font-bold text-gray-800">Tunai</h3>
                    <p class="text-sm text-gray-500">Bayar dengan uang pas atau kembalian</p>
                </div>
            </button>

            <button 
                class="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                onclick={() => selectMethod('QRIS')}
            >
                <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <QrCode class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 class="font-bold text-gray-800">QRIS / E-Wallet</h3>
                    <p class="text-sm text-gray-500">Scan QR Code dengan aplikasi apa saja</p>
                </div>
            </button>

            <button 
                class="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                onclick={() => selectMethod('CARD')}
            >
                <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <CreditCard class="w-6 h-6 text-purple-600" />
                </div>
                <div>
                    <h3 class="font-bold text-gray-800">Kartu Debit / Kredit</h3>
                    <p class="text-sm text-gray-500">Menggunakan mesin EDC</p>
                </div>
            </button>
        </div>
    </div>
</Modal>
