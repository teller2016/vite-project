<template>
    <h1>Todo</h1>

    <div>
        <label>
            <input type="text" v-model="todo">
        </label>
        <button @click.prevent="addTodo" class="addBtn">추가</button>
    </div>

    <div class="box" v-if="todoList.length">
        <label>
            <input type="checkbox" v-model="showCompleted">
            <span>Show Completed Only</span>
        </label>
    </div>

    <div>
        <ul>
            <li v-for="(todoItem) in filteredTodoList" class="todo__item">

                <label class="todo__label">
                    <input type="checkbox" v-model="todoItem.completed">
                    <span class="todo__name">
                        {{ todoItem.name }}
                    </span>
                </label>


                <button class="todo__delete" @click.prevent="deleteTodo(todoItem.id)">
                    삭제
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import {ref, reactive, computed} from 'vue';

const todo = ref('');
const showCompleted = ref(false);

const todoList = ref([]);

let id = 0;

const filteredTodoList = computed(() => {
    let arr = todoList.value;

    if (showCompleted.value) {
        arr = todoList.value.filter((item) => {
            return item.completed;
        });
    }

    return arr;
});

/** Todo 추가 이벤트 */
const addTodo = () => {
    if (!todo.value.trim()) return;

    todoList.value = [...todoList.value, {
        name: todo.value.trim(),
        id: id++,
        completed: false,
    }]
    // todoList.value.push({
    //         name: todo.value.trim(),
    //         id: id++,
    //         completed: false,
    //     }
    // );
}

/** Todo 삭제 이벤트 */
const deleteTodo = (id) => {
    todoList.value = todoList.value.filter((item) =>  {
        return id != item.id;
    });
}
</script>


<style lang="scss" scoped>
input[type='text'] {
    height: 42px;
    box-sizing: border-box;
    padding: 0 8px;
}

.box {
    margin-top: 14px;
}

.addBtn {
    margin-left: 8px;
}
.todo {
    &__item {
        list-style-type: decimal;
        display: flex;
        align-items: center;

        &:not(:first-of-type) {
            margin-top: 8px;
        }
    }

    &__label {
        display: inline-block;
    }

    &__name {
        display: inline-block;
        min-width: 200px;
    }

    &__delete {
        margin-left: 10px;
    }

    &__completed {

    }
}
</style>