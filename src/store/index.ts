import { type InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { SET_TASKS, TASKS_ERROR, TASKS_PENDDING, SET_SELECTED_TASK, ADD_TASK, IS_SHOW_ADD_TASK, REMOVE_TASK } from './mutation-types'
import { DELETE_TASK, FETCH_TASKS, SAVE_TASK } from './action-types'
import { v4 as uuidv4 } from 'uuid';
import Api from '@/utils/api';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean
}

// define your typings for the store state
export interface State {
  data: {
    pending: boolean,
    tasks: Task[],
    errorMsg?: string;
  },
  selected: string,
  showAddTask: boolean
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store: Store<State> = createStore<State>({
  state: {
    data: {
      pending: false,
      tasks: [],
      errorMsg: ''
    },
    selected: '1',
    showAddTask: false
  },
  mutations: {
    [SET_TASKS](state, payload) {
      state.data.tasks = payload.tasks;
    },
    [TASKS_PENDDING](state, payload) {
      state.data.pending = payload.pending;
    },
    [TASKS_ERROR](state, payload) {
      state.data.errorMsg = payload.errorMsg;
    },
    [SET_SELECTED_TASK](state, payload) {
      state.selected = payload.selected;
      if(state.showAddTask) state.showAddTask = !state.showAddTask
    },
    [ADD_TASK](state, payload) {
      state.data.tasks.push(payload.task);
    },
    [REMOVE_TASK](state, { id }) {
      let prev = '', next = '';
      
      state.data.tasks = state.data.tasks.filter(task => {
        const is = task.id !== id
        if(!is) {
          next = state.data.tasks[state.data.tasks.indexOf(task) + 1]?.id;
          state.selected = prev || next
        };
        prev = task.id;
        return is;
      });
    },
    [IS_SHOW_ADD_TASK](state) {
      state.showAddTask = !state.showAddTask;
      if(!state.showAddTask && !state.selected) state.selected = state.data.tasks[0].id;
    }
  },
  actions: {
    async [FETCH_TASKS] ({ commit }) {
      commit({
        type: TASKS_PENDDING,
        pending: true
      })
      Api.hit({
        action: Api.get('/tasks'),
        onSuccess: (tasks: Task) => {
          commit({
            type: SET_TASKS,
            tasks: tasks
          })
  
          commit({
            type: TASKS_PENDDING,
            pending: false
          })
        },
        onError: (error: string | { message: string }) => {
          commit({
            type: TASKS_ERROR,
            errorMsg: typeof error == 'string' ? error : error.message
          })
  
          commit({
            type: TASKS_PENDDING,
            pending: false
          })
        }
      })
    },
    async [SAVE_TASK] ({ commit }, { title, description }) {
      const task: Task = {
        id: uuidv4(),
        title,
        description,
        completed: false,
      }
      commit({
        type: TASKS_PENDDING,
        pending: true
      })
      Api.hit({
        action: Api.post('/tasks', task),
        onSuccess: (task: Task) => {
          commit({
            type: ADD_TASK,
            task
          })
  
          commit({
            type: TASKS_PENDDING,
            pending: false
          })
        },
        onError: (error: string | { message: string }) => {
          commit({
            type: TASKS_ERROR,
            errorMsg: typeof error == 'string' ? error : error?.message || "Something went wrong!"
          })
  
          commit({
            type: TASKS_PENDDING,
            pending: false
          })
        }
      })
    },
    async [DELETE_TASK]({ commit }, { id }){
      commit({
        type: TASKS_PENDDING,
        pending: true
      })

      Api.hit({
        action: Api.delete(`/tasks/${id}`),
        onSuccess: () => {
          commit({
            type: REMOVE_TASK,
            id
          })
  
          commit({
            type: TASKS_PENDDING,
            pending: false
          })
        },
        onError: () => {}
      })
    }
  }
})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}

export const selectPending = () => store.state.data.pending;
export const selectErrorMsg = () => store.state.data.errorMsg;
export const selectTasks = () => store.state.data.tasks;
export const selectSelectedTask = () => store.state.data.tasks.find(task => task.id === store.state.selected);
export const selectShowAddTask = () => store.state.showAddTask;