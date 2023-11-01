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
  }

  function $reset() {
    name.value = 'Default Name';
    count.value = 0;
  }

  return {
    count, name, doubleCount, increment, $reset
  }
 });
