function Editor(id, customWidth, customHeight) {
  this.id = id;
  this.formatBtn = [
    "bold",
    "italic",
    "strikeThrough",
    "underline",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
    "btn_image",
  ];
  this.headingData = [
    { text: "기본값", value: "p" },
    { text: "Heading 1", value: "h1" },
    { text: "Heading 2", value: "h2" },
    { text: "Heading 3", value: "h3" },
    { text: "Heading 4", value: "h4" },
    { text: "Heading 5", value: "h5" },
    { text: "Heading 6", value: "h6" },
  ];
  this.modeData = [
    { name: "edit", checked: true, value: "편집모드" },
    { name: "html", checked: false, value: "HTML모드" },
    { name: "preview", checked: false, value: "미리보기" },
  ];
  this.customWidth = customWidth || "100%";
  this.customHeight = customHeight || "20rem";
}

let savedSelection;
let sharedContent = "<p><br/></p>";

const buttonIcon = {
  bold: "fa-regular fa-b",
  italic: "fa-solid fa-italic",
  strikeThrough: "fa-solid fa-strikethrough",
  underline: "fa-solid fa-underline",
  justifyLeft: "fa-solid fa-align-left",
  justifyCenter: "fa-solid fa-align-center",
  justifyRight: "fa-solid fa-align-right",
  btn_image: "fa-regular fa-image",
};

// 사용자가 modeData 정하는 함수
Editor.prototype.setModeData = function (modeData) {
  this.modeData = modeData;
};

// 사용자가 headingData를 정하는 함수
Editor.prototype.setHeadingData = function (headingData) {
  this.headingData = headingData;
};

// 사용자가 formatBtn를 정하는 함수
Editor.prototype.setFormatBtn = function (formatBtn) {
  this.formatBtn = formatBtn;
};

// 에디터의 내용을 받아오는 함수
Editor.prototype.getData = function () {
  const editMode = document.querySelector(`#${this.id}_editMode`);
  return editMode.innerHTML;
};

// 에디터에게 내용을 보내는 함수
Editor.prototype.setData = function (text) {
  const editMode = document.querySelector(`#${this.id}_editMode`);
  sharedContent = text;
  editMode.innerHTML = sharedContent;
};

// 사용자에게 에디터를 시작을 알려주는 함수
Editor.prototype.startEditor = function () {
  const editorElement = createEditor(
    this.id,
    this.customWidth,
    this.formatBtn,
    this.headingData,
    this.customHeight,
    this.modeData
  );
  onInitCompleted();
  return editorElement;
};

/**
 * 에디터 생성 함수
 */
function createEditor(
  id,
  customWidth,
  formatBtn,
  headingData,
  customHeight,
  modeData
) {
  const app = document.createElement("div");
  const editorApp = document.createElement("div");
  const func = document.createElement("div");

  CreateOutline(id, app, editorApp, customWidth);
  CreateToolbar(id, editorApp, func, formatBtn, headingData, modeData);
  CreateEditInput(id, editorApp, customHeight);

  return app;
}

// 에디터 전체를 감싸는 Dom 생성
function CreateOutline(id, app, editorApp, customWidth) {
  app.id = id;
  editorApp.className = "editor";
  editorApp.id = `${id}editor`;
  editorApp.style.width = customWidth;
  app.appendChild(editorApp);
}

// 에디터 툴을 보여주는 툴바 Dom 생성
function CreateToolbar(id, editorApp, func, formatBtn, headingData, modeData) {
  func.className = "func";
  func.id = `${id}_func`;
  editorApp.appendChild(func);

  // toolbar icon button
  formatBtn.forEach((formatName) => {
    let buttonNode;

    if (formatName === "btn_image")
      buttonNode = CreateImageButton(id, formatName);
    else buttonNode = CreateFormatButton(id, formatName);

    func.appendChild(buttonNode);
  });

  // toolbar selectBox
  const headingSelect = CreateHeadingSelect(id, headingData);
  func.appendChild(headingSelect);

  // toolbar mode button
  modeData.forEach((mode) => {
    const modeBtn = CreateModeButton(id, mode);
    func.appendChild(modeBtn);
  });
}

// 에디터 toolbar에 들어가는 서식버튼 Dom 생성
function CreateFormatButton(id, formatName) {
  const isJustify = ["justifyLeft", "justifyCenter", "justifyRight"].find(
    (j) => {
      if (j === formatName) {
        return true;
      }
    }
  );
  const newBtn = document.createElement("button");
  newBtn.id = `${id}_formatBtn_${formatName}`;
  newBtn.className = "formatBtn";
  newBtn.addEventListener("click", () => {
    execFunction(formatName, newBtn);

    if (isJustify) {
      CheckJustify(id);
    }
  });

  const iconNode = CreateButtonIcon(formatName);
  newBtn.appendChild(iconNode);

  return newBtn;
}

// 에디터 toolbar에 들어가는 이미지업로드 버튼 Dom 생성
function CreateImageButton(id, formatName) {
  // 파일 업로드 버튼 스타일 커스텀을 위해 display: none
  const newInput = document.createElement("input");
  newInput.type = "file";
  newInput.accept = "image/*";
  newInput.multiple = true;
  newInput.style.display = "none";
  newInput.id = `${id}_file_input`;
  newInput.addEventListener("change", (e) => {
    const files = e.currentTarget.files;
    imageUpload(e, id, files);
  });

  // 커스텀 버튼에 input 기능을 연결해주기 위해 label 생성
  const newLabel = document.createElement("label");
  newLabel.setAttribute("for", `${id}_file_input`);

  const newBtn = document.createElement("div");
  newBtn.id = `${id}_formatBtn_${formatName}`;
  newBtn.className = "formatBtn";

  const iconNode = CreateButtonIcon(formatName);
  newBtn.appendChild(iconNode);

  newLabel.appendChild(newBtn);
  newLabel.appendChild(newInput);

  return newLabel;
}

// 에디터 toolbar - 서식버튼의 icon을 보여주는 Dom 생성
function CreateButtonIcon(formatName) {
  // 서식이름: 아이콘 이미지 이름
  const buttonIcon = {
    bold: "fa-regular fa-b",
    italic: "fa-solid fa-italic",
    strikeThrough: "fa-solid fa-strikethrough",
    underline: "fa-solid fa-underline",
    justifyLeft: "fa-solid fa-align-left",
    justifyCenter: "fa-solid fa-align-center",
    justifyRight: "fa-solid fa-align-right",
    btn_image: "fa-regular fa-image",
  };
  const newI = document.createElement("i");
  newI.className = buttonIcon[formatName];

  return newI;
}

// 에디터 toolbar - Heading에 대한 selectBox Dom 생성
function CreateHeadingSelect(id, headingData) {
  const headingSelect = document.createElement("select");
  headingSelect.id = `${id}_headingSelect`;
  headingSelect.name = "heading";
  headingSelect.className = "selectBox";
  headingSelect.addEventListener("change", (e) => {
    ChangeHeading(id, e.target.value);
  });

  headingData.forEach((data) => {
    let option = document.createElement("option");
    option.value = data.value;
    option.text = data.text;
    option.id = `${id}_headingOption_${data.value}`;
    option.className = `${id}_headingOption`;
    headingSelect.appendChild(option);
  });

  return headingSelect;
}

// 에디터 toolbar - 모드 전환 버튼 Dom 생성
function CreateModeButton(id, mode) {
  const modeBtn = document.createElement("input");
  modeBtn.type = "button";
  modeBtn.id = `${id}_mode_${mode.name}`;
  modeBtn.className = "modeBtn";
  modeBtn.value = mode.value;
  modeBtn.name = mode.name;
  if (mode.checked) {
    modeBtn.style.backgroundColor = "#6d9eec";
    modeBtn.style.color = "#fff";
  }
  modeBtn.addEventListener("click", () => ChangeMode(id, mode));

  return modeBtn;
}

// 에디터에서 글 쓰는 부분 Dom 생성
function CreateEditInput(id, editorApp, customHeight) {
  const modeDivData = [
    { name: "edit", id: "editMode", display: "block" },
    { name: "html", id: "htmlMode", display: "none" },
    { name: "preview", id: "preViewMode", display: "none" },
  ];

  modeDivData.forEach((data) => {
    let mode;
    if (data.id === "editMode") {
      mode = document.createElement("div");
      mode.addEventListener("click", () => {
        CheckFormat(id);
      });
      mode.addEventListener("keydown", () => CheckFormat(id));
      mode.addEventListener("input", () => divInput(id, mode));
      mode.addEventListener("drop", (e) => {
        e.preventDefault();
        const { files } = e.dataTransfer;
        imageUpload(e, id, files);
      });
      mode.contentEditable = "true";
      document.execCommand("defaultParagraphSeparator", false, "p");
    } else if (data.id === "htmlMode") {
      mode = document.createElement("textarea");
      mode.addEventListener("input", () => divInput(id, mode));
    } else {
      mode = document.createElement("div");
    }
    mode.className = "inputEdit";
    mode.id = `${id}_${data.id}`;
    mode.style.display = data.display;
    mode.style.height = customHeight;
    mode.name = data.name;
    editorApp.appendChild(mode);

    if (data.id === "editMode") {
      mode.innerHTML = sharedContent;
    }
  });
}

// editor input에 쓴 글 관리
function divInput(id, mode) {
  if (mode.id === `${id}_editMode` && mode.innerHTML === "") sharedContent = "<p></br></p>";
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
    while (
      !hTags.includes(parentElement.localName) &&
      parentElement.localName !== "div"
    ) {
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

// 선택영역 -> span
function SpanArea() {
  const selection = document.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rangeCopy = range.cloneRange();
    rangeCopy.collapse(false);

    const startSpan = document.createElement("span");
    startSpan.id = "start_span";

    const endSpan = document.createElement("span");
    endSpan.id = "end_span";

    range.insertNode(startSpan);
    rangeCopy.insertNode(endSpan);
  }
}

// span -> 선택영역
function SelectionArea() {
  const startSpan = document.querySelector("#start_span");
  const endSpan = document.querySelector("#end_span");
  if (startSpan == null) return;

  const select = document.getSelection();

  // span태그 영역 지정
  const spanRange = document.createRange();
  spanRange.setStartAfter(startSpan);
  spanRange.setEndBefore(endSpan);

  console.log("spanRange: ", spanRange);

  select.removeAllRanges();
  select.addRange(spanRange);

  startSpan.parentNode.removeChild(startSpan);
  endSpan.parentNode.removeChild(endSpan);
}

// heading 기능 동기화
function ChangeHeading(id, hTag) {
  const editMode = document.querySelector(`#${id}_editMode`);

  const selection = document.getSelection();
  const range = selection.getRangeAt(0);
  let startParentLine = range.startContainer.parentElement;
  let endParentLine = range.endContainer.parentElement;

  const lineTags = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];

  // 최상위 라인찾기
  const parentLineNode = (parentLine) => {
    while (
      !lineTags.includes(parentLine.localName) &&
      parentLine.localName !== "div"
    ) {
      parentLine = parentLine.parentElement;

      if (lineTags.includes(parentLine.localName)) break;
    }
    return parentLine;
  };

  // 부모의 자식 노드 찾기
  let childStartNode = parentLineNode(startParentLine);
  let childEndNode = parentLineNode(endParentLine);

  // nodeList에 라인별로 배열요소로 들어감
  let nodeList = [];

  while (true) {
    nodeList.push(childStartNode);
    if (childStartNode === childEndNode) break;
    childStartNode = childStartNode.nextSibling;
  }

  SpanArea();

  // 바뀐 hTag에 자식 노드 넣어주기
  const changeParent = (node) => {
    const newNode = document.createElement(hTag);

    while (node.firstChild) {
      newNode.appendChild(node.firstChild);
    }

    node.parentNode.replaceChild(newNode, node);
    newNode.style.textAlign = node.style.textAlign;
  };

  nodeList.forEach((node) => changeParent(node));

  // console.log("range: ",range)

  SelectionArea();

  sharedContent = editMode.innerHTML;
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
      htmlMode.innerText = sharedContent;
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

// 이미지 업로드 기능
function imageUpload(e, id, files) {
  const editMode = document.querySelector(`#${id}_editMode`);
  const maxSize = 5 * 1024 * 1024; // 한 이미지의 최대 용량 2MB ~ 5MB 적당
  let fileSize;

  // 넘어온 파일들 하나씩 처리
  for (const file of files) {
    // 하나라도 이미지 파일이 아닐 경우 & 파일 사이즈 제한
    let filSize = file.size;
    if (!file.type.includes("image/")) {
      alert("이미지 파일만 업로드 가능");
      return;
    } else if (fileSize > maxSize) {
      alert("파일 사이즈는 5MB까지 가능");
    }

    // 해당 이미지를 Base64 데이터 URL로 변환
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = createElement(e, file);
      editMode.appendChild(preview);
      sharedContent = editMode.innerHTML;
    };
    reader.readAsDataURL(file); // 파일 읽기 시작
  }

  // 이미지 돔 만들기
  const createElement = (e) => {
    const image = document.createElement("img");
    image.setAttribute("src", e.target.result);
    image.style.width = "30%";
    return image;
  };
}

// 에디터가 로드된 시점을 가져오는 콜백 함수
function onInitCompleted() {
  console.log("onInitCompleted");
}
