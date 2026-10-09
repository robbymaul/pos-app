export type ModalState = 
    | 'NONE'
    | 'LOGIN'
    | 'OPEN_SHIFT'
    | 'PAYMENT_METHODS'
    | 'PAYMENT_CASH'
    | 'PAYMENT_QRIS'
    | 'RECEIPT'
    | 'CLOSE_SHIFT';

export class UIState {
    activeModal = $state<ModalState>('LOGIN');
    isOffline = $state<boolean>(false);
    
    // For payment flow
    paymentAmount = $state<number>(0);
    paymentMethod = $state<'CASH' | 'QRIS' | 'CARD' | null>(null);

    openModal(modal: ModalState) {
        this.activeModal = modal;
    }

    closeModal() {
        this.activeModal = 'NONE';
    }
}

export const uiState = new UIState();
