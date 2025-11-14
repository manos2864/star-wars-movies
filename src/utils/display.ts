const romanNumbers: Record<number, string> = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X",
};

export const numberToRoman = (num: number | null) => {
  if (num == null || typeof num !== "number" || num <= 0 || num > 10) return;

  return romanNumbers[num];
};
