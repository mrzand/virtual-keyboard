KEYS_EN = ['`', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Back',
  'Tab', "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
  'Caps', "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", 'Enter',
  "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", '↑', "Win",
  "Ctrl", "Alt", "Space", "←", "↓", "→"
],

  KEYS_EN_CAPS = ['~', '!', "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", 'Back',
    'Tab', "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "\\",
    'Caps', "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', 'Enter',
    "Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", '↑', "Win",
    "Ctrl", "Alt", "Space", "←", "↓", "→"
  ],

  KEYS_RUS = ['ё', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Back',
    'Tab', "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
    'Caps', "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", 'Enter',
    "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", '↑', "Win",
    "Ctrl", "Alt", "Space", "←", "↓", "→"
  ],

  KEYS_RUS_CAPS = ['Ё', '!', '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", 'Back',
    'Tab', "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\\",
    'Caps', "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", 'Enter',
    "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", '↑', "Win",
    "Ctrl", "Alt", "Space", "←", "↓", "→"
  ],

  KEY_CODE = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8, 9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 91, 17, 18, 32, 37, 40, 39];

const KEYBOARD = {
  elements: {
    textarea: null,
    main: null,
    keysContainer: null,
    keys: [],
  },

  properties: {
    value: "",
    caps: false,
    englishLanguage:
      JSON.parse(localStorage.getItem("englishLanguage")) === null
        ? true
        : JSON.parse(localStorage.getItem("englishLanguage")),
  },

  init() {
    // create textarea
    this.elements.textarea = document.createElement("textarea");
    this.elements.textarea.classList.add("keyboard-textarea");
    this.elements.textarea.autofocus = true;
    // create keyboard container
    this.elements.main = document.createElement("div");
    this.elements.main.classList.add("keyboard");
    // create keyboard keys
    this.elements.keysContainer = document.createElement("div");
    this.elements.keysContainer.classList.add("keyboard-keys");
    this.elements.keysContainer.appendChild(this.createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll(
      ".keyboard-key"
    );
    // append keyboards elements
    document.body.appendChild(this.elements.textarea);
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
    document.addEventListener("keydown", this.onKeyPress.bind(this));
    document.addEventListener("click", this.onKeyPress.bind(this));
    document.addEventListener("keyup", this.onKeyUpPress.bind(this));
  },

  // create keyboard keys
  createKeys() {
    const fragment = document.createDocumentFragment();
    this.aKeys = this.properties.englishLanguage ? KEYS_EN : KEYS_RUS;
    this.aKeys.forEach((key, index) => {
      const keyElement = document.createElement("button");
      const lineBreak =
        ["Back", "\\", "Enter", "Win"].indexOf(key) !== -1;

      // add keyboard key buttons
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard-key");

      switch (key) {

        case "Caps":
          keyElement.classList.add("keyboard-key-caps");
          keyElement.innerHTML = "Caps";
          keyElement.dataset.Caps = true;
          break;

        case "Enter":
          keyElement.classList.add("keyboard-key-double");
          keyElement.innerHTML = "Enter";
          keyElement.dataset.Enter = true;
          break;

        case "Space":
          keyElement.classList.add("keyboard-key-space");
          keyElement.innerHTML = "Space";
          keyElement.dataset.Space = true;
          break;

        case "Tab":
          keyElement.innerHTML = "Tab";
          keyElement.dataset.Tab = true;
          break;

        case "Shift":
          keyElement.classList.add("keyboard-key-double");
          keyElement.innerHTML = "Shift";
          keyElement.dataset.Shift = true;
          break;

        default:
          keyElement.textContent = key;
          keyElement.innerHTML = key;
          keyElement.dataset.LetterCode = KEY_CODE[index];
          keyElement.dataset.Letter = KEYS_EN[index];
          break;
      }
      fragment.appendChild(keyElement);
      if (lineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });
    return fragment;
  },

  onKeyUpPress(e) {
    let evtobj = window.event ? event : e;
    evtobj.preventDefault();
    let keyCode = evtobj.keyCode;
    let currentVirtualKey = this.getCurrentVirtualKey(keyCode);
    if (currentVirtualKey !== undefined) currentVirtualKey.classList.remove("active");
  },

  // keypress check
  onKeyPress(e) {
    let evtobj = window.event ? event : e;
    evtobj.preventDefault();

    // ctrl + alt
    if (evtobj.altKey && evtobj.shiftKey) {
      this.properties.englishLanguage = !this.properties.englishLanguage;
    }

    // caps
    if (evtobj.keyCode == 20 || e.target.dataset.Caps) {
      this.properties.caps = !this.properties.caps;
      let aLetters = this.checkLettersArray();
      this.changeLanguage(aLetters);
      document.querySelector(".keyboard-key-caps").classList.toggle("caps-active");
      return;
    }

    //backspace
    if (evtobj.keyCode == 8 || e.target.dataset.Back) {
      this.properties.value = this.properties.value.slice(
        0,
        this.properties.value.length - 1
      );
    }
    let aLetters = this.checkLettersArray();
    this.changeLanguage(aLetters);
    this.addTextToTextArea(e, evtobj.keyCode);
  },

  // change language
  changeLanguage(aLetters) {
    this.aKeys = document.querySelectorAll(".keyboard-key");
    this.aLetters = aLetters;
    this.aKeys.forEach((key, index) => {
      key.innerText = this.aLetters[index];
      key.dataset.LetterCode = KEY_CODE[index];
      key.dataset.Letter = this.aLetters[index];
    });
    localStorage.setItem("englishLanguage", this.properties.englishLanguage);
  },

  // change language array
  checkLettersArray() {
    let isCaps = this.properties.caps;
    let isEng = this.properties.englishLanguage;
    if (isEng && isCaps) return KEYS_EN_CAPS;
    if (isEng && !isCaps) return KEYS_EN;
    if (!isEng && isCaps) return KEYS_RUS_CAPS;
    if (!isEng && !isCaps) return KEYS_RUS;
  },

  // add text to textarea
  addTextToTextArea(e, keyCode) {
    let sLetter = this.checkKey(e, keyCode);
    this.properties.value += sLetter;
    this.elements.textarea.value = "";
    this.elements.textarea.value = this.properties.value;
  },

  // check key
  checkKey(e, keyCode) {
    let sLetter = "";
    // for virtual keyboard
    if (e.target.dataset.Letter) {
      sLetter = this.checkSpecialKey(e.target.dataset.Letter);
    }
    // for phisycal keyboard
    if (this.aLetters[KEY_CODE.indexOf(keyCode)]) {
      let key = this.aLetters[KEY_CODE.indexOf(keyCode)];
      this.setFocus(keyCode);
      sLetter = this.checkSpecialKey(key);
    }
    return sLetter;
  },

  checkSpecialKey(key) {
    switch (key) {
      case "Back":
      case "Caps":
      case "Shift":
      case "Ctrl":
      case "Alt":
      case "Win":
        key = "";
        break;
      case "Enter":
        key = "\n";
        break;
      case "Space":
        key = " ";
        break;
      case "Tab":
        key = "   ";
        break;
    }
    return key;
  },

  setFocus(keyCode) {
    let currentVirtualKey = this.getCurrentVirtualKey(keyCode);
    currentVirtualKey.classList.add("active");
  },

  getCurrentVirtualKey(keyCode) {
    let currentVirtualKey;
    this.elements.keys.forEach((item) => {
      if (item.dataset.LetterCode == keyCode) {
        currentVirtualKey = item;
      }
    });
    return currentVirtualKey;
  },
};

window.addEventListener("DOMContentLoaded", function () {
  KEYBOARD.init();
});