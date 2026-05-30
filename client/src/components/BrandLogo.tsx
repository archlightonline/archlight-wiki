import { useEffect, useRef } from 'react';

/**
 * Renders the Archlight medallion logo on a canvas, making the dark JPEG
 * background transparent so it sits on the dark theme — a faithful port of the
 * original assets/js/logo.js. Source image: /assets/logo.jpg (decoded from the
 * original embedded base64).
 */
export function BrandLogo({ size = 42, className }: { size?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    cv.width = size;
    cv.height = size;
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      try {
        const data = ctx.getImageData(0, 0, size, size);
        const px = data.data;
        for (let i = 0; i < px.length; i += 4) {
          const br = (px[i] + px[i + 1] + px[i + 2]) / 3;
          if (br < 44) px[i + 3] = 0;
          else if (br < 88) px[i + 3] = Math.round(((br - 44) / 44) * 255);
        }
        ctx.putImageData(data, 0, 0);
      } catch {
        /* getImageData can throw if tainted; leave the drawn image as-is */
      }
    };
    img.src = '/assets/logo.jpg';
  }, [size]);

  return (
    <span className={`brand-logo${className ? ' ' + className : ''}`}>
      <canvas ref={ref} aria-hidden="true" />
    </span>
  );
}
