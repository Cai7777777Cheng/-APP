import { readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'vite';

const root = process.cwd();
const outDir = resolve(root, '.standalone-build');
const entryName = 'standalone.entry.html';

await build({
  configFile: false,
  root,
  base: './',
  publicDir: resolve(root, 'public'),
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(root, entryName)
    }
  }
});

const builtHtmlPath = resolve(outDir, entryName);
const builtHtml = await readFile(builtHtmlPath, 'utf8');
const stylesheetMatch = builtHtml.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/);
const scriptMatch = builtHtml.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/);

if (!stylesheetMatch || !scriptMatch) {
  throw new Error('Could not locate the generated CSS or JavaScript asset.');
}

const resolveBuiltAsset = (href) => resolve(outDir, href.replace(/^\.\//, ''));
const css = await readFile(resolveBuiltAsset(stylesheetMatch[1]), 'utf8');
let javascript = await readFile(resolveBuiltAsset(scriptMatch[1]), 'utf8');
const embeddedAssets = {};

for (const imageName of [
  'real-adopted-plot.png',
  'real-harvest-outcome.png',
  'real-rooftop-farmer.png',
  'real-seed-selection.png'
]) {
  const imageBytes = await readFile(resolve(outDir, 'assets', imageName));
  embeddedAssets[imageName] = `data:image/png;base64,${imageBytes.toString('base64')}`;
}

javascript = javascript.replaceAll('</script>', '<\\/script>');

const standaloneHtml = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Urban VibeSeeker 城市农场服务 App，可直接双击离线打开。" />
    <title>Urban VibeSeeker App</title>
    <style>${css}</style>
  </head>
  <body>
    <div id="app"></div>
    <script>window.__URBAN_GARDEN_ASSETS__=${JSON.stringify(embeddedAssets)};</script>
    <script>${javascript}</script>
  </body>
</html>
`;

await writeFile(resolve(root, 'index2.html'), standaloneHtml, 'utf8');
await rm(outDir, { recursive: true, force: true });

console.log(`Generated index2.html (${(Buffer.byteLength(standaloneHtml) / 1024 / 1024).toFixed(2)} MB)`);
