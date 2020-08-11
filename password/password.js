// @ts-check

/** @type {HTMLButtonElement} */
let generateButton = document.querySelector('[name="generate"]');
/** @type {HTMLInputElement} */
let lengthInput = document.querySelector('[name="length"]');
/** @type {HTMLInputElement} */
let passwordInput = document.querySelector('[name="password"]');
/** @type {HTMLInputElement} */
let symbolsInput = document.querySelector('[name="symbols"]');
/** @type {HTMLButtonElement} */
let copyButton = document.querySelector("#copy");

let mappers = {
  all(code) {
    return (code % 94) + 33;
  },
  alpha(code) {
    let result = (code % 52) + 65;
    return result > 90 && result < 97 ? result + 6 : result;
  },
  lowercaseAlpha(code) {
    return (code % 26) + 97;
  },
  alphanumeric(code) {
    let result = (code % 62) + 48;
    if (result > 57 && result < 65) {
      result += 7;
    }
    if (result > 90 && result < 97) {
      result += 6;
    }
    return result;
  },
};

[8, 16, 32, 64].forEach((length) => {
  document.querySelector(`#length-${length}`).addEventListener("click", () => {
    lengthInput.value = length.toString(10);
  });
});

generateButton.addEventListener("click", () => {
  let length = Number.parseInt(lengthInput.value, 10);
  let values = new Uint8Array(length);
  crypto.getRandomValues(values);

  let value = String.fromCodePoint(
    ...Array.from(values).map(mappers[symbolsInput.value])
  );

  passwordInput.value = value;
});

copyButton.addEventListener("click", () => {
  passwordInput.select();
  passwordInput.setSelectionRange(0, 99999);
  document.execCommand("copy");
});
