import blobToUint8Array from "./blobToUint8Array";
import convertToWebP from "./convertToWebP";
import encodeBase45 from "./encodeBase45";

async function generateShareUrl(
  file: File,
  lat: number,
  lng: number,
): Promise<string> {
  const webpBlob = await convertToWebP(file);
  const byteArray = await blobToUint8Array(webpBlob);
  const base45 = encodeBase45(byteArray);

  const fragment = new URLSearchParams({
    pic: base45,
    lat: lat.toFixed(6),
    lng: lng.toFixed(6),
  }).toString();

  return `${window.location.href}/#${fragment}`;
}

export default generateShareUrl;
