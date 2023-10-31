<template>
    <h1>Counter</h1>
    <p>
        카운터
    </p>

    <div>
        <p>name: {{ store.name }}</p>
        <p>doubleCount: {{ store.doubleCount }}</p>
        <p>doubleValue: {{ doubleValue }}</p>
    </div>

    <div>
        반응형
        <p>name: {{ nameRef }}</p>
        <p>doubleCount: {{ doubleCountRef }}</p>
    </div>

    <div>
        <button @click="resetStore">Reset Store</button>
    </div>
</template>

<script setup>
import { storeToRefs} from 'pinia';
import {useCounterStore} from '.././stores/Counter';
import {computed} from 'vue';

const store = useCounterStore();

// 일반
const {name, doubleCount} = store;
// 반응형 유지
const {name:nameRef, doubleCount:doubleCountRef} = storeToRefs(store);


setTimeout(() => {
    store.increment();
}, 1000);

const doubleValue = computed(() => store.doubleCount);

const resetStore = () => {
    store.$reset();
}

</script>

<style scoped>

</style>