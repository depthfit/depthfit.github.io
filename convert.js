const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend/src/pages');
const destDir = path.join(__dirname, 'backend/app/(frontend)');

fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.astro'));

let headLinks = '';

for (const file of files) {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  
  if (file === 'index.astro') {
    const headMatch = content.match(/<head>([\s\S]*?)<\/head>/i);
    if (headMatch) {
      headLinks = headMatch[1]
        .replace(/<title>.*?<\/title>/gi, '') // Remove title, handled by metadata
        .replace(/<meta charset="UTF-8">/gi, '')
        .replace(/<meta name="viewport".*?>/gi, '')
        .replace(/<link rel="stylesheet" href="style.css">/gi, '')
        .replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}')
        .replace(/<link([^>]*[^/])>/g, '<link$1 />')
        .replace(/<meta([^>]*[^/])>/g, '<meta$1 />');
    }
  }

  let jsx = content
    .replace(/class=/g, 'className=')
    .replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}')
    .replace(/<img([^>]*[^/])>/g, '<img$1 />')
    .replace(/<input([^>]*[^/])>/g, '<input$1 />')
    .replace(/<br>/g, '<br />')
    .replace(/<hr>/g, '<hr />');

  // Fix style="width: 100%; height: 100%;" to React style={{width: "100%", height: "100%"}}
  jsx = jsx.replace(/style="([^"]+)"/g, (match, p1) => {
    const reactStyle = p1.split(';').filter(Boolean).map(s => {
      let [key, value] = s.split(':');
      if (!key || !value) return '';
      key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      return `${key}: "${value.trim()}"`;
    }).filter(Boolean).join(', ');
    return `style={{ ${reactStyle} }}`;
  });

  const bodyMatch = jsx.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let componentBody = bodyMatch ? bodyMatch[1] : jsx;
  
  // Replace <script> blocks inside body since Next.js uses <Script>
  componentBody = componentBody.replace(/<script>([\s\S]*?)<\/script>/gi, (match, p1) => {
    return `<Script id="script-${file.replace('.astro','')}">{\`${p1.replace(/`/g, '\\`')}\`}</Script>`;
  });

  const reactComponent = `
import React from 'react';
import Script from 'next/script';

export default function Page() {
  return (
    <>
      ${componentBody}
    </>
  );
}
`;

  const routeName = file === 'index.astro' ? 'page' : file.replace('.astro', '');
  const outPath = file === 'index.astro' 
    ? path.join(destDir, 'page.tsx')
    : path.join(destDir, routeName, 'page.tsx');
    
  if (file !== 'index.astro') {
    fs.mkdirSync(path.join(destDir, routeName), { recursive: true });
  }
  
  fs.writeFileSync(outPath, reactComponent);
}

const layoutContent = `
import React from 'react';
import Script from 'next/script';

export const metadata = {
  title: '三川流域誌 - 經濟部水利署第三河川分署',
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <head>
        ${headLinks}
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        {children}
        <Script src="/script.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
`;
fs.writeFileSync(path.join(destDir, 'layout.tsx'), layoutContent);

console.log('Conversion done.');
