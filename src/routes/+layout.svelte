<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { onMount } from 'svelte';
	import { uiState } from '#lib/state/ui.svelte';
	import LoginModal from '#lib/components/LoginModal.svelte';
	import OpenShiftModal from '#lib/components/OpenShiftModal.svelte';
	import PaymentMethodsModal from '#lib/components/PaymentMethodsModal.svelte';
	import PaymentCashModal from '#lib/components/PaymentCashModal.svelte';
	import PaymentQrisModal from '#lib/components/PaymentQrisModal.svelte';
	import ReceiptModal from '#lib/components/ReceiptModal.svelte';
	import Sidebar from '#lib/components/Sidebar.svelte';

	let { children }: LayoutProps = $props();

	onMount(() => {
		uiState.isOffline = !navigator.onLine;
		window.addEventListener('offline', () => uiState.isOffline = true);
		window.addEventListener('online', () => uiState.isOffline = false);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex h-screen bg-gray-50 overflow-hidden font-sans">
	<Sidebar />
	<div class="flex-1 flex flex-col min-w-0">
		{@render children()}
	</div>
</div>

<LoginModal />
<OpenShiftModal />
<PaymentMethodsModal />
<PaymentCashModal />
<PaymentQrisModal />
<ReceiptModal />
