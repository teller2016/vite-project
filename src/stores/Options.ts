// options api 사용
import { defineStore } from "pinia";

interface State {
    count: number
    name: string
    changed: boolean
}

export const useOptionsStore = defineStore('options', {
    state: (): State => {
        return {
            count: 0,
            name: 'options molly',
            changed: false,
        }
    },
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++
        }
    }
})