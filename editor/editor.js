import { CheckFormat } from "./button.js";
import { CreateFormatBtn } from "./component.js";

// 페이지 로드 시 코드를 실행
document.addEventListener("DOMContentLoaded", () => {
  CreateEditor("editor");
});

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

// 에디터 생성 함수
function CreateEditor(id) {
  // editor outline
  const app = document.createElement("div");
  app.id = id;
  document.body.appendChild(app);
  const editorApp = document.createElement("div");
  editorApp.className = "editor";
  editorApp.id = `${id}editor`;
  app.appendChild(editorApp)

  // editor toolbar
  const func = document.createElement("div");
  func.className = "func";
  func.id = `${id}_func`;
  

  // toolbar btn
  formatBtn.forEach((button) => {
    func.appendChild(CreateFormatBtn(id, `_formatBtn_${button}`, button));
  });
  const toolbarBtn = `<select name="heading" class="selectBox">
  <option value="heading1">Heading 1</option>
  <option value="heading2">Heading 2</option>
  <option value="heading3">Heading 3</option>
  <option value="heading4">Heading 4</option>
  <option value="heading5">Heading 5</option>
  <option value="heading6">Heading 6</option>
</select>
<label class="radioBtn">
  <label class="radioOption">
      <input type="radio" name="mode" value="edit" onClick='ChangeMode(this)' checked />
      <span>편집모드</span>
  </label>
  <label class="radioOption">
      <input type="radio" name="mode" value="html" onClick='ChangeMode(this)' />
      <span>HTML모드</span>
  </label>
  <label class="radioOption">
      <input type="radio" name="mode" value="preview" onClick='ChangeMode(this)' />
      <span>미리보기</span>
  </label>
</label>`;

  func.innerHTML += toolbarBtn;
  editorApp.appendChild(func);


  // 에디터 편집기 모드
  const editMode = document.createElement("div");
  editMode.className = "inputEdit";
  editMode.id = `${id}_editMode`;
  editMode.contentEditable = 'true';
  editMode.addEventListener('click', CheckFormat(id));
  editMode.style.display = "block";
  editorApp.appendChild(editMode);

  // const htmlMode = document.createElement("div");
  // editMode.className = "inputEdit";
  // editMode.id = `${id}_htmlMode`;
  // editMode.contentEditable = 'true';
  // editMode.style.display = "none";
  // editorApp.appendChild(htmlMode);

  // const preViewMode = document.createElement("div");
  // editMode.className = "inputEdit";
  // editMode.id = `${id}_preViewMode`;
  // editMode.style.display = "none";
  // editorApp.appendChild(preViewMode);

  const hr = document.createElement("hr");
  editorApp.appendChild(hr)

  const editHeightControl = document.createElement("div");
  editHeightControl.style.textAlign = 'center';
  editHeightControl.style.color = '#d0d0d0';
  editHeightControl.innerText = '↓ 높이 조절 가능 ↓'
  app.appendChild(editHeightControl)



  // FormatButton("func", "bold", 'fa-regular fa-b')
  // FormatButton("func", "italic", 'fa-solid fa-italic')
  // FormatButton("func", "strikeThrough", 'fa-solid fa-strikethrough')
  // FormatButton("func", "underline", 'fa-solid fa-underline')
  // FormatButton("func", "btn-ul", 'fa-solid fa-list-ul')
  // FormatButton("func", "btn-ol", 'fa-solid fa-list-ol')
  // FormatButton("func", "justifyLeft", 'fa-solid fa-align-left')
  // FormatButton("func", "justifyCenter", 'fa-solid fa-align-center')
  // FormatButton("func", "justifyRight", 'fa-solid fa-align-right')
  // FormatButton("func", "btn-image", 'fa-regular fa-image')
}
