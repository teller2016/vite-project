import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  const count = ref<number>(0);
  const name = ref<string>('Molly');

  const doubleCount = computed<number>(() => {
    return count.value * 2;
  });

  function increment() {
    count.value++;
    console.log(count.value);
  }

  return {
    count, name, doubleCount, increment
  }
 });
