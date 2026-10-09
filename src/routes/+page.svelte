<script lang="ts">
	import { posState } from '#lib/state/pos.svelte';
	import { uiState } from '#lib/state/ui.svelte';
	import { Search, ShoppingCart, Trash2, Plus, Minus, CreditCard, Banknote } from 'lucide-svelte';

	let searchQuery = $state('');

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
	};
</script>

<div class="flex flex-1 h-full overflow-hidden">
	<!-- Left Panel: Products -->
	<div class="flex-1 flex flex-col min-w-0 bg-gray-50">
		<header class="bg-white border-b border-gray-200 p-4 flex items-center justify-between gap-4">
			<div class="flex items-center gap-3">
				<h1 class="text-xl font-bold text-gray-800">POS System</h1>
				{#if uiState.isOffline}
					<span class="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full flex items-center gap-1">
						<span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
						Offline
					</span>
				{/if}
			</div>
			<div class="relative flex-1 max-w-md">
				<Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Cari produk atau SKU..."
					class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
		</header>

		<!-- Categories -->
		<div class="bg-white border-b border-gray-200 p-2 overflow-x-auto flex gap-2 hide-scrollbar">
			<button
				class="px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors {posState.activeCategory === '' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
				onclick={() => (posState.activeCategory = '')}
			>
				Semua
			</button>
			{#each posState.categories as category}
				<button
					class="px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors {posState.activeCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
					onclick={() => (posState.activeCategory = category)}
				>
					{category}
				</button>
			{/each}
		</div>

		<!-- Product Grid -->
		<div class="flex-1 overflow-y-auto p-4">
			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each posState.filteredProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase())) as product (product.id)}
					<button
						class="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-start text-left hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95"
						onclick={() => posState.addToCart(product)}
					>
						<div class="w-full aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
							<span class="text-gray-400 text-sm">No Image</span>
						</div>
						<div class="text-xs text-gray-500 mb-1">{product.sku}</div>
						<div class="font-semibold text-gray-800 line-clamp-2 mb-2 flex-1">{product.name}</div>
						<div class="text-blue-600 font-bold">{formatCurrency(product.price)}</div>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Right Panel: Cart -->
	<div class="w-[400px] bg-white border-l border-gray-200 flex flex-col shadow-xl z-10">
		<div class="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
			<div class="flex items-center gap-2">
				<ShoppingCart class="w-5 h-5 text-gray-600" />
				<h2 class="font-bold text-gray-800">Keranjang</h2>
			</div>
			<button 
				class="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
				onclick={() => posState.clearCart()}
				disabled={posState.cart.length === 0}
			>
				<Trash2 class="w-4 h-4" />
				Kosongkan
			</button>
		</div>

		<div class="flex-1 overflow-y-auto p-4 space-y-4">
			{#if posState.cart.length === 0}
				<div class="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
					<ShoppingCart class="w-16 h-16 opacity-20" />
					<p>Keranjang kosong</p>
				</div>
			{:else}
				{#each posState.cart as item (item.product.id)}
					<div class="flex flex-col gap-2 p-3 border border-gray-100 rounded-lg bg-gray-50/50">
						<div class="flex justify-between items-start">
							<div>
								<div class="font-medium text-gray-800">{item.product.name}</div>
								<div class="text-blue-600 font-medium text-sm">{formatCurrency(item.product.price)}</div>
							</div>
							<div class="font-bold text-gray-800">{formatCurrency(item.product.price * item.quantity)}</div>
						</div>
						<div class="flex items-center justify-between mt-2">
							<div class="flex items-center bg-white border border-gray-200 rounded-lg">
								<button 
									class="p-2 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
									onclick={() => posState.updateQuantity(item.product.id, item.quantity - 1)}
								>
									<Minus class="w-4 h-4" />
								</button>
								<div class="w-10 text-center font-semibold text-gray-800">{item.quantity}</div>
								<button 
									class="p-2 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
									onclick={() => posState.updateQuantity(item.product.id, item.quantity + 1)}
								>
									<Plus class="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>

		<!-- Totals & Payment -->
		<div class="border-t border-gray-200 bg-gray-50 p-4 space-y-3">
			<div class="flex justify-between text-gray-600 text-sm">
				<span>Subtotal</span>
				<span>{formatCurrency(posState.subtotal)}</span>
			</div>
			<div class="flex justify-between text-gray-600 text-sm">
				<span>PPN (11%)</span>
				<span>{formatCurrency(posState.tax)}</span>
			</div>
			<div class="flex justify-between text-gray-800 font-bold text-xl pt-2 border-t border-gray-200">
				<span>Total</span>
				<span class="text-blue-600">{formatCurrency(posState.total)}</span>
			</div>
			
			<div class="grid grid-cols-2 gap-2 pt-4">
				<button 
					class="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 p-4 rounded-xl font-bold hover:bg-gray-50 active:bg-gray-100 transition-colors"
					disabled={posState.cart.length === 0}
					onclick={() => uiState.openModal('PAYMENT_CASH')}
				>
					<Banknote class="w-5 h-5" />
					Tunai
				</button>
				<button 
					class="flex items-center justify-center gap-2 bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={posState.cart.length === 0}
					onclick={() => uiState.openModal('PAYMENT_METHODS')}
				>
					<CreditCard class="w-5 h-5" />
					Lainnya
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	/* Hide scrollbar for category list but keep functionality */
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
