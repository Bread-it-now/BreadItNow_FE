const NUMBER_FORMAT_REGX = /\B(?=(\d{3})+(?!\d))/g;

export function comma(value: number | string): string {
  if (typeof value === "string" && isNaN(Number(value))) {
    throw new Error("Invalid input");
  }
  return value.toString().replace(NUMBER_FORMAT_REGX, ",");
}

export function uncomma(value: string) {
  return parseInt(value.replace(/,/g, ""));
}
