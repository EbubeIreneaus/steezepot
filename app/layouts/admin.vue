<template>
    <main ref="main" class="min-h-screen bg-slate-950 text-slate-100 lg:pl-[250px]">
        <header class="bg-slate-900">
            <UContainer>
                <div class="flex justify-between items-center py-2">
                    <div class="flex items-center gap-x-2">
                        <UButton icon="fa6-solid:bars" variant="outline" @click="toggleSidebar()" />
                        <h2 class="font-display font-semibold">Admin</h2>
                    </div>

                    <div class="flex items-center gap-2">
                        <UButton icon="fa6-solid:bell" variant="ghost" color="neutral" />
                        <UDropdownMenu :items="[
                            { label: 'Reviews', icon: 'fa6-solid:pen-clip', color: 'neutral', type: 'link', to: '/admin/reviews' },
                            { label: 'FAQ', icon: 'fa6-solid:question', color: 'neutral', type: 'link', to: '/admin/faq' },
                        ]">
                            <UButton icon="fa6-solid:gear" variant="ghost" color="neutral" />
                        </UDropdownMenu>
                    </div>

                </div>
            </UContainer>
        </header>
        <UContainer class="py-5">
            <slot />
        </UContainer>
    </main>
    <aside ref="sidebar"
        class="absolute lg:fixed top-0 max-w-[0] opacity-0 lg:max-w-[250px] lg:opacity-100 w-[250px] h-screen bg-slate-900  overflow-x-hidden">
        <div class="px-3">
            <div class="flex justify-end items-center py-5 mb-5">
                <UButton icon="fa6-solid:xmark" variant="ghost" size="xl" color="error" @click="toggleSidebar()" />
            </div>

            <ul>
                <li class="mb-2">
                    <UButton to="/admin/" active-class="!text-primary" icon="fa6-solid:building-columns"
                        label="Dashboard" color="neutral" variant="soft" class="font-roboto font-semibold w-full "
                        size="lg" />
                </li>
                <li class="mb-2">
                    <UButton to="/admin/orders" active-class="!text-primary" icon="fa6-solid:basket-shopping"
                        label="Orders" color="neutral" variant="soft" class="font-roboto font-semibold  w-full "
                        size="lg" />
                </li>
                <li class="mb-2">
                    <UButton icon="fa6-solid:cannabis" active-class="!text-primary" to="/admin/products"
                        label="Products" color="neutral" variant="soft" class="font-roboto font-semibold  w-full "
                        size="lg" />
                </li>
            </ul>

            <div class="absolute bottom-0 left-0 right-0 px-3 pb-5">
                <UButton icon="fa6-solid:arrow-right-from-bracket" label="Logout" color="error" variant="soft"
                    class="font-roboto font-semibold w-full " size="lg" />
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
const sidebar = ref<HTMLElement | null>(null);
const main = ref<HTMLElement | null>(null);

function toggleSidebar() {
    if (sidebar.value && main.value) {
        sidebar.value.classList.toggle('side-toggle');
        main.value.classList.toggle('main-full');
    }
}

</script>

<style scoped>
aside,
main {
    transition: all .1s ease-in-out;
}

.side-toggle {
    max-width: 250px;
    opacity: 1;
}

.main-full {
    padding-left: 0 !important;
}

@media (min-width: 1024px) {
    .side-toggle {
        max-width: 0;
        opacity: 0;
    }

    .main-full {
        padding-left: 0 !important;
    }
}
</style>