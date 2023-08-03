<script setup lang="ts">
  import TaskList from '@/components/Task/TaskList.vue'
  import TaskDetails from '@/components/Task/TaskDetails.vue'
  import TaskAdd from '@/components/Task/TaskAdd.vue'
  import { computed, onMounted } from 'vue'
  import { useStore, selectShowAddTask, selectTasks } from '@/store';
  import { FETCH_TASKS } from '@/store/action-types'
  import { IS_SHOW_ADD_TASK } from '@/store/mutation-types';

  const { dispatch, commit } = useStore();
  
  onMounted(async () => {
    await dispatch(FETCH_TASKS)
  })

  const isShowAddTask = computed(selectShowAddTask);
  
</script>

<template>
  <header class="h-[10vh] w-[70%] px-10 flex items-center justify-between">
    <div class="text-3xl font-bold">Tasking</div>
    <button @click="commit({
      type: IS_SHOW_ADD_TASK
    })" class="w-[120px] rounded-lg py-2" :class="!isShowAddTask ? 'bg-black' : 'bg-slate-700'">
      {{ isShowAddTask ? 'Display Task' : 'Add Task' }}
    </button>
  </header>

  <main class="w-[70%] h-full flex " :class="!selectTasks().length && isShowAddTask ? 'justify-end' : ''">
    <TaskList v-if="selectTasks().length" />
    <TaskDetails v-if="selectTasks().length && !isShowAddTask" />
    <TaskAdd v-if="isShowAddTask" />
    <div class="w-full pt-32 flex justify-center" v-if="!selectTasks().length && !isShowAddTask">Empty...</div>
  </main>
</template>
