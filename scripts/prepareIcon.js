import fs from 'fs';
import path from 'path';
import pngToIco from 'png-to-ico';

const root = path.resolve(process.cwd());
const iconDir = path.join(root, 'app', 'icon');
const srcPng = path.join(iconDir, 'github_command_hub_icon_pipboy_transparent.png');
const outIco = path.join(iconDir, 'iconapp.ico');

(async () => {
  try {
    if (!fs.existsSync(iconDir)) fs.mkdirSync(iconDir, { recursive: true });
    if (!fs.existsSync(srcPng)) {
      console.error('Source PNG not found at', srcPng);
      process.exit(1);
    }
    console.log('Converting PNG to ICO from', srcPng);
    const icoBuf = await pngToIco([srcPng]);
    fs.writeFileSync(outIco, icoBuf);
    console.log('ICO generated at', outIco);
  } catch (err) {
    console.error('Failed to prepare icon:', err);
    process.exit(1);
  }
})();