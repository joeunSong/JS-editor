import { buttonIcon } from "./data.js";

/**
 * 서식 버튼 UI
 * @param {string} id editor id
 * @param {string} btnId 버튼 고유 id
 * @param {string} format 버튼의 서식 역할
 */
export function CreateFormatBtn(id, btnId, format) {
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

  if (isFormat) {
    newBtn.addEventListener("click", () => {
      execFunction(format, newBtn)
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
