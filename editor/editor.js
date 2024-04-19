function Editor(id) {
  this.id = id;
}

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
  const headingSelect = document.createElement("select");
  headingSelect.id = `${id}_headingSelect`;
  headingSelect.name = "heading";
  headingSelect.className = "selectBox";

  const headingData = [
    { text: "Heading 1", value: "heading1" },
    { text: "Heading 2", value: "heading2" },
    { text: "Heading 3", value: "heading3" },
    { text: "Heading 4", value: "heading4" },
    { text: "Heading 5", value: "heading5" },
    { text: "Heading 6", value: "heading6" },
  ];

  headingData.forEach((data) => {
    let option = document.createElement("option");
    option.value = data.value;
    option.text = data.text;
    option.id = `${id}_headingOption_${data.value}`;
    headingSelect.appendChild(option);
  });

  func.appendChild(headingSelect);

  const modeButtonData = [
    { value: "edit", checked: true, text: "편집모드" },
    { value: "html", checked: false, text: "HTML모드" },
    { value: "preview", checked: false, text: "미리보기" },
  ];

  modeButtonData.forEach((data) => {
    const modeBtn = document.createElement("input");
    modeBtn.type = "button";
    modeBtn.id = `${id}_mode_${data.value}`;
    modeBtn.className = "modeBtn";
    modeBtn.value = data.text;
    modeBtn.addEventListener("click", () => ChangeMode(id, data));

    func.appendChild(modeBtn);
  });
}

// edit input
function CreateEditInput(id, editorApp) {
  const modeDivData = [
    { id: "editMode", display: "block" },
    { id: "htmlMode", display: "none" },
    { id: "preViewMode", display: "none" },
  ];

  modeDivData.forEach((data) => {
    let mode;
    if (data.id === "editMode") {
      mode = document.createElement("div");
      mode.addEventListener("click", () => CheckFormat(id));
      mode.addEventListener("keydown", () => CheckFormat(id));
      mode.contentEditable = "true";
    } else if (data.id === "htmlMode") {
      mode = document.createElement("div");
      // textareaMode = document.createElement("textarea");
      // mode.appendChild(textareaMode)
      // mode.contentEditable = "true";
    } else {
      mode = document.createElement("div");
    }
    mode.className = "inputEdit";
    mode.id = `${id}_${data.id}`;
    mode.style.display = data.display;
    editorApp.appendChild(mode);

    defaultText = "<p></br></p>";

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
  // const selection = document.getSelection();

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

  // if (selection.rangeCount > 0) {
  //     let range = selection.getRangeAt(0);
  //     let parentElement = range.startContainer.parentElement;

  //     if(parentElement.localName==='div') {
  //     btnBold.style.color = 'black';
  //     btnItalic.style.color = 'black';
  //     btnStrikethrough.style.color = 'black';
  //     btnUnderline.style.color = 'black';
  //     }

  //     while(parentElement.localName!=='div') {

  //         if (parentElement.localName === "b") btnBold.style.color = '#2673f0';
  //         if (parentElement.localName === "i") btnItalic.style.color = '#030303';
  //         if (parentElement.localName === "strike") btnStrikethrough.style.color = '#2673f0';
  //         if (parentElement.localName === "u") btnUnderline.style.color = '#2673f0';

  //         parentElement = parentElement.parentElement;

  //         if(parentElement.localName==='div') break;
  //     }
  // }
}

// 모드 변환 + 조절된 높이 모드에 넘겨주는 함수
function ChangeMode(id, btn) {
  console.log(id);
  console.log("btn: ",btn);
  const editMode = document.querySelector(`#${id}_editMode`);
  const htmlMode = document.querySelector(`#${id}_htmlMode`);
  const preViewMode = document.querySelector(`#${id}_preViewMode`);
  const modeArray = [ editMode, htmlMode, preViewMode ]
  
  let beforeMode = null || editMode;
  let nowMode = null || editMode;
  
  // const 클릭 전 모드 확인 후, 높이 저장
  modeArray.forEach((mode) => {
    const displayElement = window.getComputedStyle(mode).getPropertyValue("display");
    if (displayElement === "block") {
      beforeMode = mode;
    }
  })
  const beforeModeHeight = window.getComputedStyle(beforeMode).getPropertyValue("height");
  

  switch (btn.value) {
    case "edit":
      console.log(btn.value);

      editMode.style.display = "block";
      htmlMode.style.display = "none";
      preViewMode.style.display = "none";
      editMode.style.height = beforeModeHeight;
      break;
    case "html":

      htmlMode.innerText = editMode.innerHTML;
      editMode.style.display = "none";
      htmlMode.style.display = "block";
      preViewMode.style.display = "none";
      htmlMode.style.height = beforeModeHeight;
      break;
    case "preview":
      console.log(btn.value);

      editMode.style.display = "none";
      htmlMode.style.display = "none";
      preViewMode.style.display = "block";
      preViewMode.style.height = beforeModeHeight;
      break;
  }
}

// 조절된 높이 모드에 넘겨주는 함수
function ChangeHeight () {
  const resizer = document.getElementById('')
}
