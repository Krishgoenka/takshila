/**
 * Canvas API poster rendering engine
 * Loads the invitation template and renders the senior's name
 * on the red box area.
 */

const TEMPLATE_PATH = '/invitation.jpg';

interface PosterData {
  name: string;
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function generatePoster(data: PosterData): Promise<string> {
  // Load the invitation template
  const templateImg = await loadImage(TEMPLATE_PATH);

  const canvas = document.createElement('canvas');
  canvas.width = templateImg.naturalWidth;
  canvas.height = templateImg.naturalHeight;
  const ctx = canvas.getContext('2d')!;

  // Draw the template image at full resolution
  ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

  // === NAME TEXT ON THE RED BOX ===
  // Nudging up further to hit the red box accurately based on the test.
  const boxCenterX = canvas.width * 0.5; // Horizontal center
  const boxCenterY = canvas.height * 0.35; // Vertical center of the red box
  const boxWidth = canvas.width * 0.7; // Width available for text

  // Calculate font size based on name length to fit the box
  const baseFontSize = Math.min(canvas.width * 0.08, 120);
  let fontSize = baseFontSize;

  // Auto-shrink font if name is too long
  ctx.font = `700 ${fontSize}px "Space Grotesk", "Inter", sans-serif`;
  let textMetrics = ctx.measureText(data.name.toUpperCase());
  while (textMetrics.width > boxWidth * 0.9 && fontSize > 20) {
    fontSize -= 2;
    ctx.font = `700 ${fontSize}px "Space Grotesk", "Inter", sans-serif`;
    textMetrics = ctx.measureText(data.name.toUpperCase());
  }

  // Draw the name text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // White text with a subtle dark drop shadow for readability
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(data.name.toUpperCase(), boxCenterX, boxCenterY);

  return canvas.toDataURL('image/png', 1.0);
}

export function downloadPoster(dataUrl: string, name: string) {
  const link = document.createElement('a');
  link.download = `Takshila_Farewell_2026_${name.replace(/\s+/g, '_')}.png`;
  link.href = dataUrl;
  link.click();
}

export function sharePoster(dataUrl: string, name: string) {
  // Try Web Share API first
  if (navigator.share && navigator.canShare) {
    fetch(dataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File(
          [blob],
          `Takshila_Farewell_2026_${name.replace(/\s+/g, '_')}.png`,
          { type: 'image/png' }
        );
        const shareData = {
          title: 'Takshila Farewell 2026',
          text: `${name} is cordially invited to Takshila Farewell 2026 ✨🎓`,
          files: [file],
        };
        if (navigator.canShare(shareData)) {
          navigator.share(shareData);
        } else {
          openWhatsAppShare(name);
        }
      })
      .catch(() => {
        openWhatsAppShare(name);
      });
  } else {
    openWhatsAppShare(name);
  }
}

function openWhatsAppShare(name: string) {
  const text = encodeURIComponent(
    `✨ ${name} is cordially invited to Takshila Farewell 2026! 🎓\n📅 31 May 2026 (Sunday) | 🕐 11:00 AM\n📍 Seminar Hall, Techno India University\n\nGet your pass at: ${window.location.href}`
  );
  window.open(`https://wa.me/?text=${text}`, '_blank');
}
