export const DEFAULT_CONVERTER = 'rgba_hex';
export const converters = {
  rgba: (c: any) => `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`,
  rgb: (c: any) => `rgb(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b})`,
  hex: (c: any) => c.hex,

  rgba_rgb: (c: any) => (c.rgb.a === 1 ? converters.rgb(c) : converters.rgba(c)),
  rgba_hex: (c: any) => (c.rgb.a === 1 ? converters.hex(c) : converters.rgba(c)),
};
export enum TConvertersType {
  rgba = 'rgba',
  rgb = 'rgb',
  hex = 'hex',
  rgba_rgb = 'rgba_rgb',
  rgba_hex = 'rgba_hex',
}

export default converters;
