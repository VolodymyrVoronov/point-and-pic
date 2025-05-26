import decodeBase45 from "./decodeBase45";

function parseSharedDataFromFragment(): {
  pic: Blob;
  lat: number;
  lng: number;
} | null {
  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash);

  const base45 = params.get("pic");
  const lat = parseFloat(params.get("lat") || "");
  const lng = parseFloat(params.get("lng") || "");

  console.log(base45, lat, lng);

  if (!base45 || isNaN(lat) || isNaN(lng)) return null;

  const binary = decodeBase45(base45);
  const arrayBuffer = binary.buffer;
  const newBuffer = new ArrayBuffer(arrayBuffer.byteLength);
  const newUint8Array = new Uint8Array(newBuffer);
  newUint8Array.set(new Uint8Array(arrayBuffer));

  const blob = new Blob([newUint8Array], { type: "image/webp" });

  return { pic: blob, lat, lng };
}

export default parseSharedDataFromFragment;
