import { BASE45_CHARSET } from "@/constants";

function encodeBase45(data: Uint8Array): string {
  let result = "";

  for (let i = 0; i < data.length; i += 2) {
    if (i + 1 < data.length) {
      let x = (data[i] << 8) + data[i + 1];
      const e = x % 45;
      x = Math.floor(x / 45);

      const d = x % 45;
      const c = Math.floor(x / 45);

      result += BASE45_CHARSET[c] + BASE45_CHARSET[d] + BASE45_CHARSET[e];
    } else {
      const x = data[i];
      const d = x % 45;
      const c = Math.floor(x / 45);

      result += BASE45_CHARSET[c] + BASE45_CHARSET[d];
    }
  }

  return result;
}

export default encodeBase45;
