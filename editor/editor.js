import { CheckFormat } from "./button.js";
import { CreateFormatBtn } from "./component.js";

// // 페이지 로드 시 코드를 실행
// document.addEventListener("DOMContentLoaded", () => {
//   CreateEditor("editor");
// });

// 사용자가 서식 버튼 설정
// const formatBtn = [
//   "bold",
//   "italic",
//   "strikeThrough",
//   "underline",
//   "btn-ul",
//   "btn-ol",
//   "justifyLeft",
//   "justifyCenter",
//   "justifyRight",
//   "btn-image",
// ];

/**
 * 에디터 생성 함수
 * @param {string} id editor 이름
 */
function CreateEditor(id) {
  // editor outline
  const app = document.createElement("div");
  app.id = id;
  document.body.appendChild(app);
  const editorApp = document.createElement("div");
  editorApp.className = "editor";
  editorApp.id = `${id}editor`;
  app.appendChild(editorApp);

  // editor toolbar
  const func = document.createElement("div");
  func.className = "func";
  func.id = `${id}_func`;

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
  editorApp.appendChild(func);

  // 에디터 편집기 모드
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
    mode.addEventListener("click", () => CheckFormat(this));
    mode.style.display = data.display;
    editorApp.appendChild(mode);
  });

  const hr = document.createElement("hr");
  editorApp.appendChild(hr);

  const editHeightControl = document.createElement("div");
  editHeightControl.style.textAlign = "center";
  editHeightControl.style.color = "#d0d0d0";
  editHeightControl.innerText = "↓ 높이 조절 가능 ↓";
  app.appendChild(editHeightControl);
}


export default CreateEditor;