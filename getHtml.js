import fs from "node:fs/promises";
import express from "express";
import path from "path";
import fileFs from "fs";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// vue 파일 경로
const directoryPath = "./src/pages";
// html 파일 저장할 경로
const savePath = "emailCompiled";
let fileList = [];

// 해당 디렉토리의 파일 목록을 가져옴
fileFs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // 파일명들을 활용하여 다른 작업 수행 가능
  fileList = files.map((file) => {
    return file.replace(".vue", "");
  });
  console.log(fileList);
});

// Cached production assets
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/ssr-manifest.json", "utf-8")
  : undefined;

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;

const { createServer } = await import("vite");
vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  base,
});
app.use(vite.middlewares);

fileList.forEach(async (url) => {
  try {
    let template;
    let render;
    // Always read fresh template in development
    template = await fs.readFile("./index.html", "utf-8");
    template = await vite.transformIndexHtml(url, template);
    render = (await vite.ssrLoadModule("/src/entry-server.ts")).render;

    const rendered = await render(url, ssrManifest);

    const content = rendered.html
      .replace(/<!--\[-->/g, "")
      .replace(/<!--\]-->/g, "");
    console.log(content);

    const filePath = path.join(process.cwd(), savePath, `${url}.html`); // 디렉토리 및 파일 이름 지정

    await fileFs.writeFileSync(filePath, content);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
  }
});
