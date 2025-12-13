// SVG 转 PNG 图标生成脚本
import { readFileSync, writeFileSync } from 'fs';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = join(__dirname, 'miniapp', 'favicon.svg');
const outputDir = join(__dirname, 'miniapp');

// 需要生成的尺寸
const sizes = [
  { name: 'favicon-16x16.png', width: 16, height: 16 },
  { name: 'favicon-32x32.png', width: 32, height: 32 },
  { name: 'apple-touch-icon.png', width: 180, height: 180 },
  { name: 'icon-192x192.png', width: 192, height: 192 },
  { name: 'icon-512x512.png', width: 512, height: 512 },
  { name: 'og-image.png', width: 1200, height: 630 },
];

console.log('🎨 开始转换图标...\n');
console.log('源文件:', svgPath);
console.log('输出目录:', outputDir);
console.log('');

// 尝试使用 Node.js Canvas 进行转换
async function convertWithBrowser() {
  console.log('使用浏览器方式转换（需要手动操作）\n');
  console.log('请按以下步骤操作：');
  console.log('1. 在浏览器中打开: https://cloudconvert.com/svg-to-png');
  console.log('2. 上传 miniapp/favicon.svg');
  console.log('3. 依次设置并下载以下尺寸：\n');
  
  sizes.forEach(({ name, width, height }) => {
    console.log(`   - ${name}: ${width}×${height} 像素`);
  });
  
  console.log('\n或者使用下面的自动化脚本（需要安装 ImageMagick）：');
  console.log('brew install imagemagick');
  console.log('npm run convert:icons');
}

// 检查是否有 sharp 或其他工具
try {
  const sharp = await import('sharp');
  await convertWithSharp(sharp.default);
} catch {
  // 尝试使用命令行工具
  const hasConvert = await checkCommand('convert');
  const hasRsvg = await checkCommand('rsvg-convert');
  
  if (hasConvert) {
    await convertWithImageMagick();
  } else if (hasRsvg) {
    await convertWithRsvg();
  } else {
    await convertWithBrowser();
  }
}

async function checkCommand(cmd) {
  return new Promise((resolve) => {
    const proc = spawn('which', [cmd]);
    proc.on('close', (code) => resolve(code === 0));
  });
}

async function convertWithSharp(sharp) {
  console.log('✓ 使用 sharp 进行转换\n');
  
  for (const { name, width, height } of sizes) {
    try {
      const outputPath = join(outputDir, name);
      await sharp(svgPath)
        .resize(width, height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      console.log(`✓ ${name}`);
    } catch (err) {
      console.error(`✗ ${name}: ${err.message}`);
    }
  }
  console.log('\n✅ 转换完成！');
}

async function convertWithImageMagick() {
  console.log('✓ 使用 ImageMagick 进行转换\n');
  
  for (const { name, width, height } of sizes) {
    const outputPath = join(outputDir, name);
    await new Promise((resolve, reject) => {
      const proc = spawn('convert', [
        svgPath,
        '-resize', `${width}x${height}`,
        '-background', 'none',
        outputPath
      ]);
      proc.on('close', (code) => {
        if (code === 0) {
          console.log(`✓ ${name}`);
          resolve();
        } else {
          reject(new Error(`convert failed with code ${code}`));
        }
      });
    });
  }
  console.log('\n✅ 转换完成！');
}

async function convertWithRsvg() {
  console.log('✓ 使用 rsvg-convert 进行转换\n');
  
  for (const { name, width, height } of sizes) {
    const outputPath = join(outputDir, name);
    await new Promise((resolve, reject) => {
      const proc = spawn('rsvg-convert', [
        '-w', width.toString(),
        '-h', height.toString(),
        svgPath,
        '-o', outputPath
      ]);
      proc.on('close', (code) => {
        if (code === 0) {
          console.log(`✓ ${name}`);
          resolve();
        } else {
          reject(new Error(`rsvg-convert failed with code ${code}`));
        }
      });
    });
  }
  console.log('\n✅ 转换完成！');
}


