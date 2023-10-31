<template>
    <h1>Products</h1>
    <p>
        상품
    </p>

    <ul>
        <li v-for="product in productStore.products" :key="product.name">
        {{ product.name }} {{ product.price }}
        </li>
    </ul>
</template>

<script setup>
import {useProductStore} from '.././stores/ProductStore';
import {storeToRefs} from 'pinia';

const productStore = useProductStore();
// const {products} = storeToRefs(useProductStore());
productStore.fill([]);

productStore.fill([
    {
        name: 'molly',
        price: 1000,
    },
    {
        name: 'fine',
        price: 5000,
    }
])
</script>

<style scoped>

</style>