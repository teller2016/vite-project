import { createSSRApp } from "vue";
import App from './App.vue';
import { createRouter } from './router';
import { createPinia } from "pinia";
import { useCommonStore } from "./stores/common";

export function createApp() {
    const app = createSSRApp(App);

    const pinia = createPinia();
    const router = createRouter();

    const isSSR = import.meta.env.SSR;

    if (!isSSR) {
        console.log('windowPinia :>> ', window.__pinia ?? {});
        console.log(JSON.parse(window.__pinia ?? '{}'));
        pinia.state.value = JSON.parse(window.__pinia ?? '{}');
    }

    const commonStore = useCommonStore(pinia);

    console.log(pinia);

    app.use(router);
    app.use(pinia);

    return {app, router, pinia};
}