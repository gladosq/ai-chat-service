export const decodeToCorrectJson = (text: string) => {
  const uint8array = new TextEncoder().encode(text);
  const stringedData = new TextDecoder().decode(uint8array);
  const correctArrayJson = stringedData.replace(/}{/g, '}, {');
  return JSON.parse(`[${correctArrayJson}]`);
};
