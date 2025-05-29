async function convertToWebP(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const targetWidth = 600;
      const targetHeight = 600;

      const srcAspect = img.width / img.height;
      const targetAspect = targetWidth / targetHeight;

      let sx = 0,
        sy = 0,
        sw = img.width,
        sh = img.height;

      if (srcAspect > targetAspect) {
        // Source is wider: crop sides
        sw = img.height * targetAspect;
        sx = (img.width - sw) / 2;
      } else {
        // Source is taller: crop top/bottom
        sh = img.width / targetAspect;
        sy = (img.height - sh) / 2;
      }

      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context not available"));

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error("Conversion failed")),
        "image/webp",
        0.95, // Compression quality
      );
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export default convertToWebP;
