import { BASE45_CHARSET } from "@/constants";

function decodeBase45(str: string): Uint8Array {
  const data = [];

  for (let i = 0; i < str.length; ) {
    if (i + 2 < str.length) {
      const c = BASE45_CHARSET.indexOf(str[i++]);
      const d = BASE45_CHARSET.indexOf(str[i++]);
      const e = BASE45_CHARSET.indexOf(str[i++]);
      const x = c * 45 * 45 + d * 45 + e;

      data.push(x >> 8, x & 0xff);
    } else {
      const c = BASE45_CHARSET.indexOf(str[i++]);
      const d = BASE45_CHARSET.indexOf(str[i++]);

      data.push(c * 45 + d);
    }
  }

  return new Uint8Array(data);
}

export default decodeBase45;
