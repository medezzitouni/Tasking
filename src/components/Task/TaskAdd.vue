<script setup lang="ts">
    import { reactive, computed, watchEffect } from 'vue';
    import { SAVE_TASK } from '@/store/action-types';
    import { useStore, selectErrorMsg } from '@/store';
    
    const { dispatch } = useStore();

    const title = reactive({
        value: '',
        error: ''
    });

    const description = reactive({
        value: '',
        error: ''
    });;

    watchEffect(() => {
        if(title.value.length > 10 ) title.error = "Title should be less than 30 chars!"
        else title.error ="";

        if(description.value.length > 574 ) description.error = "Description should be less than 574 chars!"
        else description.error = "";

    });

    const submit = () => {
        if(!validateForm()) return;

        dispatch({
            type: SAVE_TASK,
            title: title.value,
            description: description.value
        })

        title.value = "";
        description.value = "";
    }

    const errorMsg = computed(selectErrorMsg);

    function validateForm() {
        let isValid = true;
        if(title.value.length > 10 ){
            title.error = "Title should be less than 30 chars!"
            isValid = false;
        }

        if(description.value.length > 574 ) {
            title.error = "Description should be less than 574 chars!"
            isValid = false;
        }
        
        return isValid;
        
    }
</script>

<template>
    <div class="w-[65%] pl-12 pt-6">
        <form id="task-form" class="w-full h-full flex flex-col " @submit.prevent="submit">
            <div class="mb-4">
                <input v-model="title.value" type="text" class="w-[70%] px-5 py-2 rounded-md text-black" name="" id="" placeholder="Title...">
                <span v-if="title.error" class="w-[70%] flex justify-center pt-1 h-[15px] text-xs text-red-700">
                        {{ title.error  }}
                </span>
            </div>
            <div class="mb-4">
                <textarea
                    rows="15"
                    class="w-[70%] px-5 py-2 rounded-md text-black" cols=""
                    placeholder="Description..."
                    v-model="description.value"
                ></textarea>
                <span v-if="description.error" class="w-[70%] flex justify-center pt-1 h-[15px] text-xs text-red-700">
                        {{ description.error  }}
                </span>
            </div>
            <div v-if="errorMsg" class="w-[70%] flex justify-center h-[15px] text-xs text-red-700">
                    {{ errorMsg  }}
            </div>
            <span class="w-[70%] flex justify-end mt-2">
                <button form="task-form" value="submit"
                    class="py-2 px-8 bg-black rounded-lg shadow-sm hover:shadow-white"
                >
                    Add
                </button>
            </span>
        </form>
    </div>
</template>

<style scoped>

</style>