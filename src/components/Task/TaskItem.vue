<script setup lang="ts">
    import { useStore } from '@/store';
    const { commit } = useStore();
    import { SET_SELECTED_TASK } from '@/store/mutation-types'
    import { toCapital  } from '@/utils';
    defineProps<{
    tasks?: any[];
    }>();

    
</script>

<template>
 <div class="h-full">
    <div v-if="tasks?.length" class="p-3">
    <template v-for="item in tasks" :key="item.id">
        <div class="w-full bg-black rounded-xl mb-2 grid place-items-center h-[50px] cursor-pointer shadow-sm hover:shadow-white"
            @click="commit({
                type: SET_SELECTED_TASK,
                selected: item.id
            })"
        >
        {{ toCapital(item.title) }}
        </div>
    </template>
    </div>
    <div class="text-center" v-else>Empty...</div>
 </div>
</template>
