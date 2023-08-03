<script setup lang="ts">
    import { selectTasks } from '../../store/index';
    import TaskItem from './TaskItem.vue';

</script>

<template>
 <div class="h-[70vh] w-[35%] flex flex-col pt-1">
  <TaskItem :tasks="selectTasks()" />
 </div>
</template>

<style scoped></style>
