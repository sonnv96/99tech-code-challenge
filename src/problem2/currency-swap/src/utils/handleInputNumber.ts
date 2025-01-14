export const handleInputNumber = (value: string) => {
  if (/^\d*\.?\d*$/.test(value)) {
    if (value === "." || value.endsWith(".")) {
      return value;
    }
    return value === "" ? 0 : parseFloat(value);
  } else {
    return 0;
  }
};

export const isNumberOrDecimal = (value: string) => {
  // Kiểm tra xem giá trị có phải là số hoặc số thập phân hợp lệ
  return /^-?\d*\.?\d+$/.test(value);
};
