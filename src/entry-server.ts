import { renderToString } from "vue/server-renderer";
import { createApp } from "./main";
import xss from 'xss';

export async function render(url) {
  console.log('URL', url);
  const { app, router, pinia } = createApp();

  // set the router to the desired URL before rendering
  await router.push(url);
  await router.isReady();

  const ctx = {};
  const html = await renderToString(app, ctx);

  const state = xss(JSON.stringify(pinia.state.value));

  return { html, state };
}
