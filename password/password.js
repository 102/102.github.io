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

const fromCodePointWrapper = (fn) => (code) => {
  return String.fromCodePoint(fn(code));
};

/** @type string[] | undefined */
let wordsList;

let mappers = {
  all: fromCodePointWrapper((code) => {
    return (code % 94) + 33;
  }),
  alpha: fromCodePointWrapper((code) => {
    let result = (code % 52) + 65;
    return result > 90 && result < 97 ? result + 6 : result;
  }),
  lowercaseAlpha: fromCodePointWrapper((code) => {
    return (code % 26) + 97;
  }),
  alphanumeric: fromCodePointWrapper((code) => {
    let result = (code % 62) + 48;
    if (result > 57 && result < 65) {
      result += 7;
    }
    if (result > 90 && result < 97) {
      result += 6;
    }
    return result;
  }),
  async words(code) {
    if (!wordsList) {
      wordsList = await (await fetch("./words.json")).json();
    }
    return wordsList[code % (wordsList.length - 1)];
  },
};

[8, 16, 32, 64].forEach((length) => {
  document.querySelector(`#length-${length}`).addEventListener("click", () => {
    lengthInput.value = length.toString(10);
  });
});

generateButton.addEventListener("click", async () => {
  let length = Number.parseInt(lengthInput.value, 10);
  let values = new Uint16Array(length);
  crypto.getRandomValues(values);

  let value = (
    await Promise.all(Array.from(values).map(mappers[symbolsInput.value]))
  ).join(symbolsInput.value === "words" ? "-" : "");

  passwordInput.value = value;
});

let copyButtonTextTimeout;

const setCopyButtonText = (text, timeout = 750) => {
  copyButton.innerText = text;

  if (copyButtonTextTimeout) {
    clearTimeout(copyButtonTextTimeout);
  }

  copyButtonTextTimeout = setTimeout(() => {
    copyButton.innerText = "Copy";
  }, timeout);
};

copyButton.addEventListener("click", () => {
  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => setCopyButtonText("Copied"))
    .catch(() => setCopyButtonText("Failed to copy"));
});
