export function formatPrice(input: string | undefined): string {
  if (input === undefined) {
    return "0.00";
  }

  const numericValue = parseFloat(input.replace(/,/g, ""));

  if (isNaN(numericValue)) {
    return "0.00";
  }

  const formattedNumber = numericValue
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const parts = formattedNumber.split(".");

  if (parts.length === 1 || parts[1].length === 1) {
    return parts[0] + "." + parts[1] + "0";
  }

  return formattedNumber;
}

export function isZeroOrEmpty(v: string | undefined) {
  return v === "" || Number(v) === 0;
}
