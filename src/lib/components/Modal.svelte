<script lang="ts">
    import { X } from 'lucide-svelte';
    import type { Snippet } from 'svelte';

    let { isOpen, title, onClose, children }: { 
        isOpen: boolean; 
        title?: string; 
        onClose: () => void; 
        children: Snippet 
    } = $props();

    function handleBackdropClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }
</script>

{#if isOpen}
    <div 
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
        onclick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
    >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
            {#if title}
                <div class="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 class="text-xl font-bold text-gray-800">{title}</h2>
                    <button 
                        class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        onclick={onClose}
                    >
                        <X class="w-6 h-6 text-gray-500" />
                    </button>
                </div>
            {/if}
            <div class="p-6">
                {@render children()}
            </div>
        </div>
    </div>
{/if}
