export function formatNumber(input) {
  const number = Number(input);
  let message;

  let b = 0;
  let e = 0;
  const array = `${number}`.split(".").join("").split("");
  const length = array.length;

  for (let i = 0; i < length; i++) {
    if (array[i] > 0) {
      b = i - 1;
      e = b + 4;
      break;
    }
  }

  if (number < 0.001) {
    message = "0..." + `${number.toFixed(length)}`.substring(b + 2, e);
  }

  if (number >= 0.001 && number < 0.1) {
    message = `0${number.toFixed(length)}`.substring(b, e);
  }

  if (number >= 0.1 && number < 1) {
    message = `${number.toFixed(length)}`.substring(b, e);
  }

  if (number >= 1) {
    message = `${number.toFixed(length)}`.substring(b, e);
  }

  if (number >= 10) {
    message = `${number.toFixed(length)}`.substring(b, e + 1);
  }

  if (number >= 100) {
    message = `${number.toFixed(length)}`.substring(b, e + 2);
  }

  if (number >= 100) {
    message = `${number.toFixed(length)}`.substring(b, e + 3);
  }

  if (number === 0 || !number) {
    message = "0";
  }

  return message;
}