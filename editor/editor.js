function Editor(id) {
  this.id = id;
}

const buttonIcon = {
  'bold': 'fa-regular fa-b',
  'italic': 'fa-solid fa-italic',
  'strikeThrough': 'fa-solid fa-strikethrough',
  'underline': 'fa-solid fa-underline',
  'btn-ul': 'fa-solid fa-list-ul',
  'btn-ol': 'fa-solid fa-list-ol',
  'justifyLeft': 'fa-solid fa-align-left',
  'justifyCenter': 'fa-solid fa-align-center',
  'justifyRight': 'fa-solid fa-align-right',
  'btn-image': 'fa-regular fa-image',
}

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
  console.log("prototype: ",this.id)
  const app = document.createElement("div");
  const editorApp = document.createElement("div");
  const func = document.createElement("div");

  CreateOutline(this.id, app, editorApp);
  CreateToolbar(this.id, editorApp, func);
  CreateEditInput(this.id, editorApp);
  CreateEditBottom(editorApp, app);
};




// editor outline
function CreateOutline (id, app, editorApp) {
  // 부모 객체 찾아서 넣기
  app.id = id;
  document.body.appendChild(app);
  editorApp.className = "editor";
  editorApp.id = `${id}editor`;
  app.appendChild(editorApp);
}

 // editor toolbar
function CreateToolbar (id, editorApp, func) {
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

  // toolbar mode btn
  const radioBtn = document.createElement("label");
  radioBtn.id = `${id}_radioBtn`;
  radioBtn.className = "radioBtn";

  const radioOption = document.createElement("label");
  radioOption.id = `${id}_radioOption`;
  radioOption.className = "radioOption";

  const modeRadioData = [
    { value: "edit", checked: true, text: "편집모드" },
    { value: "html", checked: false, text: "HTML모드" },
    { value: "preview", checked: false, text: "미리보기" },
  ];

  modeRadioData.forEach((data) => {
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "mode";
    radioInput.value = data.value;
    radioInput.checked = data.checked;
    radioInput.addEventListener("click", () => ChangeMode(this));

    const radioSpan = document.createElement("span");
    radioSpan.innerText = data.text;

    radioOption.appendChild(radioInput);
    radioOption.appendChild(radioSpan);
  });

  radioBtn.appendChild(radioOption);
  func.appendChild(radioBtn);
}

// edit input
function CreateEditInput (id, editorApp) {
  console.log('CreateEditInput: ', id)
  const modeDivData = [
    { id: "editMode", display: "block" },
    { id: "htmlMode", display: "none" },
    { id: "preViewMode", display: "none" },
  ];

  modeDivData.forEach((data) => {
    let mode = document.createElement("div");
    mode.className = "inputEdit";
    mode.id = `${id}_${data.id}`;
    mode.contentEditable = "true";
    mode.addEventListener("click", () => CheckFormat(id));
    mode.style.display = data.display;
    editorApp.appendChild(mode);

    // if (data.id === 'editMode') {
    // }
  });
}

// edit bottom
function CreateEditBottom (editorApp, app) {
  const hr = document.createElement("hr");
  editorApp.appendChild(hr);

  const editHeightControl = document.createElement("div");
  editHeightControl.style.textAlign = "center";
  editHeightControl.style.color = "#d0d0d0";
  editHeightControl.innerText = "↓ 높이 조절 가능 ↓";
  app.appendChild(editHeightControl);
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

  // const isJustify = [
  //   "justifyLeft",
  //   "justifyCenter",
  //   "justifyRight",
  // ].find((j) => {
  //   if (j === format) {
  //     return true;
  //   }
  // });

  if (isFormat) {
    newBtn.addEventListener("click", () => {
      execFunction(format, newBtn)
    //   if (isJustify) {
    //     console.log(format)
    //     document.queryCommandState(format)
    // ? (newBtn.style.color = "#2673f0")
    // : (newBtn.style.color = "black");
    //   }
    });
  }
  newBtn.appendChild(newI);
  return newBtn;
}

// b, i, strike, u 서식 기능
function execFunction(format, btn) {
  console.log("btn");
  document.execCommand(format);
  document.queryCommandState(format)
    ? (btn.style.color = "#2673f0")
    : (btn.style.color = "black");
}

// 서식 버튼 동기화 함수
function CheckFormat(id) {
  console.log(id)
  // const selection = document.getSelection();

  const btnBold = document.querySelector(`#${id}_formatBtn_bold`);
  const btnItalic = document.querySelector(`#${id}_formatBtn_italic`);
  const btnStrikethrough = document.querySelector(
    `#${id}_formatBtn_strikeThrough`
  );
  const btnUnderline = document.querySelector(`#${id}_formatBtn_underline`);
  // todo. 목록 버튼 동기화
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

// 모드 변환 함수
function ChangeMode(obj) {
  const editMode = document.querySelector("#editMode");
  const htmlMode = document.querySelector("#htmlMode");
  const preViewMode = document.querySelector("#preViewMode");

  console.log(obj.value);
  console.log(editMode.style.display);
  switch (obj.value) {
    case "edit":
      editMode.style.display = "block";
      htmlMode.style.display = "none";
      preViewMode.style.display = "none";
      break;
    case "html":
      htmlMode.innerHTML = editMode.innerHTML;
      editMode.style.display = "none";
      htmlMode.style.display = "block";
      preViewMode.style.display = "none";
      console.log(editMode.innerHTML);
      break;
    case "preview":
      editMode.style.display = "none";
      htmlMode.style.display = "none";
      preViewMode.style.display = "block";
      break;
  }
}
