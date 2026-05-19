import { copyFileSync } from 'fs';
const src = String.raw`C:\Users\admin\.gemini\antigravity\brain\4796c8f3-584c-48f9-b295-15fa071b9f43\takshila_logo_1779173137884.png`;
const dest = String.raw`C:\Users\admin\invi\public\takshila-logo.png`;
copyFileSync(src, dest);
console.log('Logo copied successfully!');
