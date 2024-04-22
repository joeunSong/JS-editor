function Editor(id) {
  this.id = id;
}

let savedSelection;

const buttonIcon = {
  bold: "fa-regular fa-b",
  italic: "fa-solid fa-italic",
  strikeThrough: "fa-solid fa-strikethrough",
  underline: "fa-solid fa-underline",
  "btn-ul": "fa-solid fa-list-ul",
  "btn-ol": "fa-solid fa-list-ol",
  justifyLeft: "fa-solid fa-align-left",
  justifyCenter: "fa-solid fa-align-center",
  justifyRight: "fa-solid fa-align-right",
  "btn-image": "fa-regular fa-image",
};

// 사용자가 서식 버튼 설정
const formatBtn = [
  "bold",
  "italic",
  "strikeThrough",
  "underline",
  "btn-ul",
  "btn-ol",
  "justifyLeft",
  "justifyCenter",
  "justifyRight",
  "btn-image",
];

/**
 * 에디터 생성 함수
 * @param {string} id editor 이름
 */
Editor.prototype.createEditor = function () {
  const app = document.createElement("div");
  const editorApp = document.createElement("div");
  const func = document.createElement("div");

  CreateOutline(this.id, app, editorApp);
  CreateToolbar(this.id, editorApp, func);
  CreateEditInput(this.id, editorApp);

  return app;
};

// editor outline
function CreateOutline(id, app, editorApp) {
  // 부모 객체 찾아서 넣기
  app.id = id;
  // document.body.appendChild(app);
  editorApp.className = "editor";
  editorApp.id = `${id}editor`;
  app.appendChild(editorApp);
}

// editor toolbar
function CreateToolbar(id, editorApp, func) {
  func.className = "func";
  func.id = `${id}_func`;
  editorApp.appendChild(func);

  // toolbar btn
  formatBtn.forEach((button) => {
    func.appendChild(CreateFormatBtn(id, `_formatBtn_${button}`, button));
  });

  // toolbar selectBox
  const headingData = [
    { text: "기본값", value: "p" },
    { text: "Heading 1", value: "h1" },
    { text: "Heading 2", value: "h2" },
    { text: "Heading 3", value: "h3" },
    { text: "Heading 4", value: "h4" },
    { text: "Heading 5", value: "h5" },
    { text: "Heading 6", value: "h6" },
  ];

  const headingSelect = document.createElement("select");
  headingSelect.id = `${id}_headingSelect`;
  headingSelect.name = "heading";
  headingSelect.className = "selectBox";
  headingSelect.addEventListener("change", (e) => {
    saveSelection();
    ChangeHeading(id, e.target.value);
    restoreSelection();
  });

  headingData.forEach((data) => {
    let option = document.createElement("option");
    option.value = data.value;
    option.text = data.text;
    option.id = `${id}_headingOption_${data.value}`;
    option.className = `${id}_headingOption`;
    headingSelect.appendChild(option);
  });

  func.appendChild(headingSelect);

  const modeButtonData = [
    { name: "edit", checked: true, value: "편집모드" },
    { name: "html", checked: false, value: "HTML모드" },
    { name: "preview", checked: false, value: "미리보기" },
  ];

  modeButtonData.forEach((data) => {
    const modeBtn = document.createElement("input");
    modeBtn.type = "button";
    modeBtn.id = `${id}_mode_${data.name}`;
    modeBtn.className = "modeBtn";
    modeBtn.value = data.value;
    modeBtn.name = data.name;
    if (data.checked) {
      modeBtn.style.backgroundColor = "#6d9eec";
      modeBtn.style.color = "#fff";
    }
    modeBtn.addEventListener("click", () => ChangeMode(id, data));

    func.appendChild(modeBtn);
  });
}

// edit input
function CreateEditInput(id, editorApp) {
  const modeDivData = [
    { name: "edit", id: "editMode", display: "block" },
    { name: "html", id: "htmlMode", display: "none" },
    { name: "preview", id: "preViewMode", display: "none" },
  ];

  modeDivData.forEach((data) => {
    let mode;
    if (data.id === "editMode") {
      mode = document.createElement("div");
      mode.addEventListener("click", () => CheckFormat(id));
      mode.addEventListener("keydown", () => CheckFormat(id));
      mode.addEventListener("input", () => divInput(id, mode));
      mode.contentEditable = "true";
    } else if (data.id === "htmlMode") {
      mode = document.createElement("textarea");
      // textareaMode = document.createElement("textarea");
      // mode.appendChild(textareaMode)
      // mode.contentEditable = "true";
    } else {
      mode = document.createElement("div");
    }
    mode.className = "inputEdit";
    mode.id = `${id}_${data.id}`;
    mode.style.display = data.display;
    mode.name = data.name;
    editorApp.appendChild(mode);

    let defaultText = "<p></br></p>";

    if (data.id === "editMode") {
      mode.innerHTML = defaultText;
    }
  });
}

/**
 * 서식 버튼 UI
 * @param {string} id editor id
 * @param {string} btnId 버튼 고유 id
 * @param {string} format 버튼의 서식 역할
 */
function CreateFormatBtn(id, btnId, format) {
  const newI = document.createElement("i");
  newI.className = buttonIcon[format];

  const newBtn = document.createElement("button");
  newBtn.id = `${id}${btnId}`;
  newBtn.className = "formatBtn";

  const isFormat = [
    "bold",
    "italic",
    "strikeThrough",
    "underline",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
  ].find((f) => {
    if (f === format) {
      return true;
    }
  });

  const isJustify = ["justifyLeft", "justifyCenter", "justifyRight"].find(
    (j) => {
      if (j === format) {
        return true;
      }
    }
  );

  if (isFormat) {
    newBtn.addEventListener("click", () => {
      execFunction(format, newBtn);

      if (isJustify) {
        CheckJustify(id);
      }
    });
  }
  newBtn.appendChild(newI);
  return newBtn;
}

let sharedContent = "";
// editor input에 쓴 글 관리
function divInput(id, mode) {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  sharedContent = mode.innerHTML;
}

// b, i, strike, u 서식 기능
function execFunction(format, btn) {
  document.execCommand(format);
  document.queryCommandState(format)
    ? (btn.style.color = "#2673f0")
    : (btn.style.color = "black");
}

// 정렬 버튼 동기화 함수
function CheckJustify(id) {
  const btnLeft = document.querySelector(`#${id}_formatBtn_justifyLeft`);
  const btnCenter = document.querySelector(`#${id}_formatBtn_justifyCenter`);
  const btnRight = document.querySelector(`#${id}_formatBtn_justifyRight`);

  for (let i = 0; i < 3; i++) {
    document.queryCommandState("justifyLeft")
      ? (btnLeft.style.color = "#2673f0")
      : (btnLeft.style.color = "black");
    document.queryCommandState("justifyCenter")
      ? (btnCenter.style.color = "#2673f0")
      : (btnCenter.style.color = "black");
    document.queryCommandState("justifyRight")
      ? (btnRight.style.color = "#2673f0")
      : (btnRight.style.color = "black");
  }

  // const range = document.getSelection().getRangeAt(0);
  // const rangeElement = range.startContainer.parentElement;
  // const elementTextAlign = window
  //   .getComputedStyle(rangeElement)
  //   .getPropertyValue("text-align");

  // justifyArray.forEach((button) => {
  //   format === elementTextAlign
  //     ? (button.style.color = "#2673f0")
  //     : (button.style.color = "black");
  //   format === elementTextAlign
  //     ? (button.style.color = "#2673f0")
  //     : (button.style.color = "black");
  //   format === elementTextAlign
  //     ? (button.style.color = "#2673f0")
  //     : (button.style.color = "black");
  // });

  // return elementTextAlign;
}

// 서식 버튼 동기화 함수
function CheckFormat(id) {
  const selection = document.getSelection();
  const btnBold = document.querySelector(`#${id}_formatBtn_bold`);
  const btnItalic = document.querySelector(`#${id}_formatBtn_italic`);
  const btnStrikethrough = document.querySelector(
    `#${id}_formatBtn_strikeThrough`
  );
  const btnUnderline = document.querySelector(`#${id}_formatBtn_underline`);
  const btnLeft = document.querySelector(`#${id}_formatBtn_justifyLeft`);
  const btnCenter = document.querySelector(`#${id}_formatBtn_justifyCenter`);
  const btnRight = document.querySelector(`#${id}_formatBtn_justifyRight`);

  document.queryCommandState("bold")
    ? (btnBold.style.color = "#2673f0")
    : (btnBold.style.color = "black");
  document.queryCommandState("italic")
    ? (btnItalic.style.color = "#2673f0")
    : (btnItalic.style.color = "black");
  document.queryCommandState("strikeThrough")
    ? (btnStrikethrough.style.color = "#2673f0")
    : (btnStrikethrough.style.color = "black");
  document.queryCommandState("underline")
    ? (btnUnderline.style.color = "#2673f0")
    : (btnUnderline.style.color = "black");
  document.queryCommandState("justifyLeft")
    ? (btnLeft.style.color = "#2673f0")
    : (btnLeft.style.color = "black");
  document.queryCommandState("justifyCenter")
    ? (btnCenter.style.color = "#2673f0")
    : (btnCenter.style.color = "black");
  document.queryCommandState("justifyRight")
    ? (btnRight.style.color = "#2673f0")
    : (btnRight.style.color = "black");

    if (selection.rangeCount > 0) {
      let range = selection.getRangeAt(0);
      let parentElement = range.startContainer.parentElement;
      const hTags = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];
  
  
      // heading tag 동기화
      const selectBox = document.querySelector(`#${id}_headingSelect`);
      const options = selectBox.querySelectorAll(`.${id}_headingOption`);
      while (!hTags.includes(parentElement.localName) && (parentElement.localName !== 'div')) {
        parentElement = parentElement.parentElement;
  
        if (hTags.includes(parentElement.localName)) break;
      }

  
      if (hTags.includes(parentElement.localName)) {
        for (i = 0; i < hTags.length; i++) {
          if (options[i].value === parentElement.localName) {
            options[i].selected = true;
          } else {
            options[i].selected = false;
          }
        }
      }
    }
}

// 포커스를 저장하는 함수
function saveSelection() {
  savedSelection = document.getSelection().getRangeAt(0).cloneRange();
}

// 저장한 포커스를 다시 설정하는 함수
function restoreSelection() {
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(savedSelection);
}

// heading 기능 동기화
function ChangeHeading(id, hTag) {
  const editMode = document.querySelector(`#${id}_editMode`);
  const selection = document.getSelection();
  const range = selection.getRangeAt(0);
  let nodes_str = "";
  const editDiv = Array.from(
    document.querySelector(`#${id}_editMode`).childNodes
  );

  // 한 줄 선택할 경우
  if (range.endContainer === range.startContainer) {
    editDiv.forEach((element) => {
      let element_str = element.outerHTML;
      if (element.contains(range.startContainer)) {
        nodes_str += element_str.replace(
          /<(\/?)(p|h[1-6])>/g,
          function (match, p1, p2) {
            return p1 === "/" ? `</${hTag}>` : `<${hTag}>`;
          }
        );
      } else {
        nodes_str += element_str;
      }
    });
    sharedContent = nodes_str;
    editMode.innerHTML = sharedContent;
  }

  // 여러줄 선택할 경우
  if (
    !selection.isCollapsed &&
    range.commonAncestorContainer.childNodes.length
  ) {
    const selectionArray = Array.from(range.commonAncestorContainer.childNodes);
    let isSelection = false;

    selectionArray.forEach((element) => {
      let element_str = element.outerHTML;
      if (element.contains(range.startContainer)) {
        isSelection = true;
      }
      if (isSelection) {
        nodes_str += element_str.replace(
          /<(\/?)(p|h[1-6])>/g,
          function (match, p1, p2) {
            return p1 === "/" ? `</${hTag}>` : `<${hTag}>`;
          }
        );
      }
      if (!isSelection) {
        nodes_str += element_str;
      }
      if (element.contains(range.endContainer)) {
        isSelection = false;
      }
    });
    sharedContent = nodes_str;
    editMode.innerHTML = sharedContent;
  }
}

// 모드 변환 + 조절된 높이 모드에 넘겨주는 함수
function ChangeMode(id, btn) {
  const formatButtons = document.querySelectorAll(".formatBtn");
  const selectBox = document.querySelector(".selectBox");
  const editMode = document.querySelector(`#${id}_editMode`);
  const htmlMode = document.querySelector(`#${id}_htmlMode`);
  const preViewMode = document.querySelector(`#${id}_preViewMode`);
  const modeArray = [editMode, htmlMode, preViewMode];
  const editBtn = document.querySelector(`#${id}_mode_edit`);
  const htmlBtn = document.querySelector(`#${id}_mode_html`);
  const previewBtn = document.querySelector(`#${id}_mode_preview`);
  const modeBtnArray = [editBtn, htmlBtn, previewBtn];

  let beforeMode = null || editMode;
  let nowMode = null || editMode;

  // const 클릭 전 모드 확인 후, 높이 저장
  modeArray.forEach((mode) => {
    const displayElement = window
      .getComputedStyle(mode)
      .getPropertyValue("display");
    if (displayElement === "block") {
      beforeMode = mode;
    }
  });
  const beforeModeHeight = window
    .getComputedStyle(beforeMode)
    .getPropertyValue("height");
  const beforeModeWidth = window
    .getComputedStyle(beforeMode)
    .getPropertyValue("width");

  // 서식 버튼 활성화/비활성화
  const formatBtnOn = () => {
    formatButtons.forEach((btn) => {
      btn.style.pointerEvents = "auto";
      btn.style.color = "black";
    });
    selectBox.removeAttribute("disabled");
    selectBox.style.color = "black";
  };
  const formatBtnOff = () => {
    formatButtons.forEach((btn) => {
      btn.style.pointerEvents = "none";
      btn.style.color = "#d0d0d0";
    });
    selectBox.disabled = "disabled";
    selectBox.style.color = "black";
  };

  switch (btn.name) {
    case "edit":
      editMode.innerHTML = sharedContent;
      editMode.style.display = "block";
      htmlMode.style.display = "none";
      preViewMode.style.display = "none";
      editMode.style.height = beforeModeHeight;
      nowMode = editMode;
      formatBtnOn();
      break;
    case "html":
      htmlMode.textContent = sharedContent;
      editMode.style.display = "none";
      htmlMode.style.display = "block";
      preViewMode.style.display = "none";
      htmlMode.style.height = beforeModeHeight;
      htmlMode.style.width = beforeModeWidth;
      nowMode = htmlMode;
      formatBtnOff();
      break;
    case "preview":
      preViewMode.innerHTML = sharedContent;
      editMode.style.display = "none";
      htmlMode.style.display = "none";
      preViewMode.style.display = "block";
      preViewMode.style.height = beforeModeHeight;
      nowMode = preViewMode;
      formatBtnOff();
      break;
  }

  // 모드 버튼 동기화
  modeBtnArray.forEach((btn) => {
    if (nowMode.name === btn.name) {
      btn.style.backgroundColor = "#6d9eec";
      btn.style.color = "#fff";
    } else {
      btn.style.backgroundColor = "#e9e9e9";
      btn.style.color = "#242424";
    }
  });
}
