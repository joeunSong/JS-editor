// 서식 버튼 모듈화
function FormatButton (parent, id, icon) {
    console.log(`Command: ${id}, Icon: ${icon}`);
    let parentDiv = document.querySelector(`.${parent}`);
    console.log(parentDiv)
    let newBtn = document.createElement("button");
    let newI = document.createElement('i');
    newI.className = icon;
    newBtn.appendChild(newI);
    newBtn.className = "formatBtn";
    if(id.includes('btn')){
        // 목록, 이미지 버튼
        // console.log(id + ' FormatButton Click - btn');
    } else if(!id.includes('btn')) {
        newBtn.addEventListener('click', function () {
            document.execCommand(id);
            document.queryCommandState(id) ? newBtn.style.color = '#2673f0' : newBtn.style.color = 'black';
        });
    }
    parentDiv.appendChild(newBtn)
}


// const btnBold = document.getElementById('btn-bold');
// const btnItalic = document.getElementById('btn-italic');
// const btnStrikethrough = document.getElementById('btn-strikethrough');
// const btnUnderline = document.getElementById('btn-underline');
// const btnLeft = document.getElementById('btn-left');
// const btnCenter = document.getElementById('btn-center');
// const btnRight = document.getElementById('btn-right');
// const inputEdit = document.getElementsByClassName('inputEdit');

// btnBold.addEventListener('click', function () {
//     document.execCommand('bold');
//     document.queryCommandState("bold") ? btnBold.style.color = '#2673f0' : btnBold.style.color = 'black';
// });

// btnItalic.addEventListener('click', function () {
//     document.execCommand('italic');
//     document.queryCommandState("italic") ? btnItalic.style.color = '#2673f0' : btnItalic.style.color = 'black';
// });

// btnUnderline.addEventListener('click', function () {
//     document.execCommand('underline');
//     document.queryCommandState("underline") ? btnUnderline.style.color = '#2673f0' : btnUnderline.style.color = 'black';
// });

// btnStrikethrough.addEventListener('click', function () {
//     document.execCommand('strikeThrough');
//     document.queryCommandState("strikeThrough") ? btnStrikethrough.style.color = '#2673f0' : btnStrikethrough.style.color = 'black';
// });

// btnLeft.addEventListener('click', function () {
//     document.execCommand('justifyLeft');
//     document.queryCommandState("justifyLeft") ? btnLeft.style.color = '#2673f0' : btnLeft.style.color = 'black';
// });

// btnCenter.addEventListener('click', function () {
//     document.execCommand('justifyCenter')
//     document.queryCommandState("justifyCenter") ? btnCenter.style.color = '#2673f0' : btnCenter.style.color = 'black';
// });

// btnRight.addEventListener('click', function () {
//     document.execCommand('justifyRight');
//     document.queryCommandState("justifyRight") ? btnRight.style.color = '#2673f0' : btnRight.style.color = 'black';
// });


// // 함수 리팩토링
// function HandleBtnClick(e) {
//     console.log(e)
// }

// function UpdateButtonColor() {
//     document.queryCommandState("bold") ? console.log('true') : console.log('false');
//     document.queryCommandState("bold") ? btnBold.style.color = '#2673f0' : btnBold.style.color = 'black';
//     document.queryCommandState("italic") ? btnItalic.style.color = '#2673f0' : btnItalic.style.color = 'black';
//     document.queryCommandState("underline") ? btnUnderline.style.color = '#2673f0' : btnUnderline.style.color = 'black';
//     document.queryCommandState("strikeThrough") ? btnStrikethrough.style.color = '#2673f0' : btnStrikethrough.style.color = 'black';
//     document.queryCommandState("justifyLeft") ? btnLeft.style.color = '#2673f0' : btnLeft.style.color = 'black';
//     document.queryCommandState("justifycenter") ? btnCenter.style.color = '#2673f0' : btnCenter.style.color = 'black';
//     document.queryCommandState("justifyRight") ? btnRight.style.color = '#2673f0' : btnRight.style.color = 'black';
// }

// inputEdit.addEventListener('select', UpdateButtonColor());

// function ChangeMode(obj) {
//     const editMode = document.getElementById('editMode');
//     const htmlValue = '';
//     const editValue = '';
//     console.log(obj)
//     console.log(editMode)
//     console.log(editMode.innerHTML)
// }