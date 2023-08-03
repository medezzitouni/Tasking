<script setup lang="ts">
    import { computed } from 'vue';
    import { selectSelectedTask, useStore } from '@/store';
    import { toCapital } from '@/utils';
    import { DELETE_TASK } from '@/store/action-types';

    const { dispatch } = useStore();

    let task = computed(selectSelectedTask);
</script>

<template>
    <div class="h-[70vh] w-[65%]" >
        <header class="flex justify-between items-center pl-6 pr-16 h-[70px] ">
            <div class="text-2xl" >{{ toCapital(task?.title!) }}</div>
            <i class="material-icons text-red-800 cursor-pointer"
                @click="dispatch({
                    type: DELETE_TASK,
                    id: task?.id
                })"
            >
                delete
            </i>
        </header>
        <main class="my-6 px-6">
            {{ toCapital(task?.description!) }}
        </main>
    </div>
</template>