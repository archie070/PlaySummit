const fs = require('fs');
const path = 'index.html';
let text = fs.readFileSync(path, 'utf8');

// Remove leftover Astro service worker island and its runtime helper
text = text.replace(/<!-- <Toaster client:load theme="dark" transition:persist \/> -->[\s\S]*?<astro-island[^>]*>[\s\S]*?<\/astro-island>/g, '');

// Replace astro:page-load reveal activation with DOMContentLoaded so it works without Astro
text = text.replace(/document\.addEventListener\("astro:page-load",\(\)=>\{([\s\S]*?)\}\)/g, 'document.addEventListener("DOMContentLoaded",()=>{$1})');

// Remove Cloudflare injected challenge iframe and analytics beacon added at the end of the file
text = text.replace(/<script>\(function\(\)\{function c\(\)\{[\s\S]*?<\/script><iframe[\s\S]*?<\/iframe><script defer="" src="https:\/\/static\.cloudflareinsights\.com[\s\S]*?<\/script>/g, '');

fs.writeFileSync(path, text, 'utf8');
console.log('index.html cleaned of remaining Astro service worker and Cloudflare scripts.');
