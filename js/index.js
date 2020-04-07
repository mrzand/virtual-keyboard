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
    isEnglishLanguage: null,
  },

  init() {
    this.setIsEnglishLanguageProperty();
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
    document.addEventListener("keyup", this.onKeyUpPress.bind(this));
    document.addEventListener("mousedown", this.onKeyPress.bind(this));
    document.addEventListener("mouseup", this.onKeyUpPress.bind(this));
  },

  setIsEnglishLanguageProperty() {
    if (JSON.parse(localStorage.getItem("englishLanguage")) === null) {
      this.properties.isEnglishLanguage = true;
      localStorage.setItem(
        "englishLanguage",
        this.properties.isEnglishLanguage
      );
    } else {
      this.properties.isEnglishLanguage = JSON.parse(
        localStorage.getItem("englishLanguage")
      );
    }
  },

  // create keyboard keys
  createKeys() {
    const fragment = document.createDocumentFragment();
    this.aLetters = this.properties.isEnglishLanguage ? KEYS_EN : KEYS_RUS;
    this.aLetters.forEach((key, index) => {
      const keyElement = document.createElement("button");
      const lineBreak = ["Back", "\\", "Enter", "Win"].indexOf(key) !== -1;

      // add keyboard key buttons
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard-key");

      switch (key) {
        case "Caps":
          keyElement.classList.add("keyboard-key-caps");
          keyElement.innerHTML = "Caps";
          keyElement.dataset.Caps = true;
          keyElement.dataset.LetterCode = KEY_CODE[index];
          keyElement.dataset.Letter = "Caps";
          break;

        case "Enter":
          keyElement.classList.add("keyboard-key-double");
          keyElement.innerHTML = "Enter";
          keyElement.dataset.Enter = true;
          keyElement.dataset.LetterCode = KEY_CODE[index];
          keyElement.dataset.Letter = "Enter";
          break;

        case "Space":
          keyElement.classList.add("keyboard-key-space");
          keyElement.innerHTML = "Space";
          keyElement.dataset.Space = true;
          keyElement.dataset.LetterCode = KEY_CODE[index];
          keyElement.dataset.Letter = "Space";
          break;

        case "Tab":
          keyElement.innerHTML = "Tab";
          keyElement.dataset.Tab = true;
          keyElement.dataset.LetterCode = KEY_CODE[index];
          keyElement.dataset.Letter = "Tab";
          break;

        case "Shift":
          keyElement.classList.add("keyboard-key-double");
          keyElement.innerHTML = "Shift";
          keyElement.dataset.Shift = true;
          keyElement.dataset.LetterCode = KEY_CODE[index];
          keyElement.dataset.Letter = "Shift";
          break;

        default:
          keyElement.textContent = key;
          keyElement.innerHTML = key;
          keyElement.dataset.LetterCode = KEY_CODE[index];
          keyElement.dataset.Letter = this.aLetters[index];
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
    if (Object.keys(this.oCurrentLetter).length !== 0) {
      let activeButtons = this.elements.keysContainer.querySelectorAll(
        ".active"
      );
      activeButtons.forEach((button) => {
        button.classList.remove("active");
      });
    }
  },

  // keypress check
  onKeyPress(e) {
    let evtobj = window.event ? event : e;
    evtobj.preventDefault();

    this.oCurrentLetter = this.getKeyObject(evtobj);
    if (Object.keys(this.oCurrentLetter).length !== 0) {
      this.setActiveStyle();

      if (this.checkIsSpecialButton(this.oCurrentLetter)) {
        this.addMethodsToSpecialButtons(this.oCurrentLetter);
        return;
      }

      this.addTextToTextArea();
    }
  },

  getKeyObject(evtobj) {
    this.oCurrentLetter = {};
    let oClickedVirtualKey = evtobj.target.dataset.LetterCode;
    let oClickedFhysicsKey = evtobj.keyCode;

  
    if (oClickedFhysicsKey) {
      if (!this.checkHasVirtualKeyForPhysic(oClickedFhysicsKey)) {
        return this.oCurrentLetter;
      }
      this.oCurrentLetter.keyCode = oClickedFhysicsKey;
      this.oCurrentLetter.Letter = this.getDOMVirtualKey(
        oClickedFhysicsKey
      ).dataset.Letter;
      this.oCurrentLetter.DOMBtn = this.getDOMVirtualKey(oClickedFhysicsKey);
      this.oCurrentLetter.AltShift = evtobj.altKey && evtobj.shiftKey;
    } else if (oClickedVirtualKey) {
      this.oCurrentLetter.keyCode = Number(oClickedVirtualKey);
      this.oCurrentLetter.Letter = evtobj.target.dataset.Letter;
      this.oCurrentLetter.DOMBtn = evtobj.target;
      this.oCurrentLetter.AltShift = evtobj.altKey && evtobj.shiftKey;
    }
    oClickedVirtualKey = null;
    oClickedFhysicsKey = null;
    return this.oCurrentLetter;
  },

  checkHasVirtualKeyForPhysic(oClickedFhysicsKey) {
    return KEY_CODE.indexOf(oClickedFhysicsKey) !== -1;
  },

  getDOMVirtualKey(keyCode) {
    let currentVirtualKey;
    this.elements.keys.forEach((item) => {
      if (item.dataset.LetterCode == keyCode) {
        currentVirtualKey = item;
      }
    });
    return currentVirtualKey;
  },

  checkIsSpecialButton(oCurrentLetter) {
    let sLetter = oCurrentLetter.Letter;
    let isSpecialBtn;
    switch (sLetter) {
      case "Back":
      case "Caps":
      case "Shift":
      case "Ctrl":
      case "Alt":
      case "Win":
      case "Enter":
      case "Space":
      case "Tab":
        isSpecialBtn = true;
        break;
      default:
        isSpecialBtn = false;
        break;
    }
    return isSpecialBtn;
  },

  addMethodsToSpecialButtons(oCurrentLetter) {
    let sLetter = oCurrentLetter.Letter;
    if (sLetter === "Caps" || oCurrentLetter.AltShift) {
      this.changeCapsOrLang();
      this.setNewLettersArr();
      this.updateVirtualKeys();
      return;
    }
    if (sLetter === "Back") this.deleteTextAreaValue();
    if (sLetter === "Enter") this.addEnterToTextAreaValue();
    if (sLetter === "Space") this.addSpaceToTextAreaValue();
    if (sLetter === "Tab") this.addTabToTextAreaValue();
  },

  changeCapsOrLang() {
    let sLetter = this.oCurrentLetter.Letter;
    if (sLetter === "Caps") {
      this.properties.caps = !this.properties.caps;
      this.oCurrentLetter.DOMBtn.classList.toggle("caps-active");
    }
    if (this.oCurrentLetter.AltShift) {
      this.properties.isEnglishLanguage = !this.properties.isEnglishLanguage;
      localStorage.setItem(
        "englishLanguage",
        this.properties.isEnglishLanguage
      );
    }
  },

  setNewLettersArr() {
    let isCaps = this.properties.caps;
    let isEng = this.properties.isEnglishLanguage;
    if (isEng && isCaps) this.aLetters = KEYS_EN_CAPS;
    if (isEng && !isCaps) this.aLetters = KEYS_EN;
    if (!isEng && isCaps) this.aLetters = KEYS_RUS_CAPS;
    if (!isEng && !isCaps) this.aLetters = KEYS_RUS;
  },

  updateVirtualKeys() {
    this.aKeys = document.querySelectorAll(".keyboard-key");
    this.aKeys.forEach((key, index) => {
      key.innerText = this.aLetters[index];
      key.dataset.LetterCode = KEY_CODE[index];
      key.dataset.Letter = this.aLetters[index];
    });
  },

  deleteTextAreaValue() {
    let sTextAreaValue = this.elements.textarea.value;
    this.elements.textarea.value = this.elements.textarea.value.slice(0, -1);
  },

  addTextToTextArea() {
    this.elements.textarea.value += this.oCurrentLetter.Letter;
  },

  addEnterToTextAreaValue() {
    this.elements.textarea.value += "\n";
  },

  addSpaceToTextAreaValue() {
    this.elements.textarea.value += " ";
  },

  addTabToTextAreaValue() {
    this.elements.textarea.value += "   ";
  },

  setActiveStyle() {
    this.styledButton = this.oCurrentLetter.DOMBtn;
    this.styledButton.classList.add("active");
  },
};

window.addEventListener("DOMContentLoaded", function () {
  KEYBOARD.init();
});
