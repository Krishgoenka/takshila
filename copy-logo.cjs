const fs = require('fs');

// Copy invitation card template
const cardSrc = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\4796c8f3-584c-48f9-b295-15fa071b9f43\\media__1779175818102.jpg';
const cardDest = 'C:\\Users\\admin\\invi\\public\\invitation-template.jpg';
fs.copyFileSync(cardSrc, cardDest);
console.log('Invitation template copied!');

// Copy Vivarta logo
const vivSrc = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\4796c8f3-584c-48f9-b295-15fa071b9f43\\vivarta_logo_1779173627981.png';
const vivDest = 'C:\\Users\\admin\\invi\\public\\vivarta-logo.png';
fs.copyFileSync(vivSrc, vivDest);
console.log('Vivarta logo copied!');

// Copy Takshila logo
const takSrc = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\4796c8f3-584c-48f9-b295-15fa071b9f43\\takshila_logo_1779173137884.png';
const takDest = 'C:\\Users\\admin\\invi\\public\\takshila-logo.png';
fs.copyFileSync(takSrc, takDest);
console.log('Takshila logo copied!');

console.log('\nAll assets are now in the public folder!');
