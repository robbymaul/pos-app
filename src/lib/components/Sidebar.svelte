<script lang="ts">
    import { LayoutGrid, ShoppingCart, History, ArrowRightLeft, Settings, LogOut, LayoutDashboard } from 'lucide-svelte';
    import { uiState } from '#lib/state/ui.svelte';
    import { page } from '$app/state';

    const menuItems = $derived([
        { icon: ShoppingCart, label: 'Kasir', href: '/' },
        { icon: History, label: 'Riwayat', href: '/history' },
        { icon: ArrowRightLeft, label: 'Shift', href: '/shift-close' },
        { icon: LayoutGrid, label: 'Produk', href: '/products' },
        { icon: LayoutDashboard, label: 'Laporan', href: '/dashboard' },
        { icon: Settings, label: 'Pengaturan', href: '/settings' }
    ]);
</script>

<div class="w-20 bg-gray-900 text-white flex flex-col items-center py-4 space-y-8 z-20">
    <!-- Logo placeholder -->
    <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
        P
    </div>

    <!-- Navigation -->
    <div class="flex-1 flex flex-col space-y-4 w-full">
        {#each menuItems as item}
            <a 
                href={item.href}
                class="w-full py-3 flex flex-col items-center gap-1 transition-colors relative {page.url.pathname === item.href ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}"
            >
                {#if page.url.pathname === item.href}
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-md"></div>
                {/if}
                <item.icon class="w-6 h-6" />
                <span class="text-[10px] font-medium">{item.label}</span>
            </a>
        {/each}
    </div>

    <!-- User & Logout -->
    <div class="flex flex-col space-y-4 w-full mt-auto">
        <button 
            class="w-full py-3 flex flex-col items-center gap-1 text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
            onclick={() => uiState.openModal('LOGIN')}
        >
            <LogOut class="w-6 h-6" />
            <span class="text-[10px] font-medium">Keluar</span>
        </button>
    </div>
</div>
