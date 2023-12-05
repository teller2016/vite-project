<template>
    <h1>Pinia Options API</h1>
    <p>
        Pinia Options API 사용
    </p>

    <div>
        {{ store.name }}
    </div>

    <div>
        <button @click="onClick">{{ store.count }}</button>
        <div>double: {{ store.doubleCount }}</div>
    </div>

    <div>
    </div>
</template>

<script setup>
import { storeToRefs} from 'pinia';
import {useOptionsStore} from '.././stores/Options';

const store = useOptionsStore();

const onClick = () => {
    store.increment();
}
</script>

<style scoped>

</style>