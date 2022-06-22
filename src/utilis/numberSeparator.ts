export function numberWithCommas(
  x: any,
  options?: { character?: string; each?: number }
) {
  let defaultArgs = { character: ",", each: 3 };
  if (options) {
    defaultArgs = { ...defaultArgs, ...options };
  }
  let reg = new RegExp("\\B(?=(\\d{" + defaultArgs.each + "})+(?!\\d))", "g");

  if (x) {
    return x.toString().replace(reg, defaultArgs.character);
  }
  return "";
}
