// 서식 버튼 동기화 함수
function CheckFormat() {
    const selection = document.getSelection();

    const btnBold = document.querySelector("#bold");
    const btnItalic = document.querySelector("#italic");
    const btnStrikethrough = document.querySelector("#strikeThrough");
    const btnUnderline = document.querySelector("#underLine");
    // todo. 목록 버튼 동기화
    const btnLeft = document.querySelector("#justifyLeft");
    const btnCenter = document.querySelector("#justifyCenter");
    const btnRight = document.querySelector("#justifyRight");
    console.log("focus")

    if (selection.rangeCount > 0) {
        let range = selection.getRangeAt(0);
        let parentElement = range.startContainer.parentElement;

        while(parentElement.localName!=='div') {
            btnBold.style.color='black';
            console.log(range)
            if (parentElement.localName === "b") {
                btnBold.style.color = '#2673f0';
            } else {
                btnBold.style.color = 'black';
            }
            parentElement.localName==="b" ? btnBold.style.color = '#2673f0' : btnBold.style.color = 'black';
            parentElement.localName==="i" ? btnItalic.style.color = '#2673f0' : btnItalic.style.color = 'black';
            parentElement.localName==="strike" ? btnStrikethrough.style.color = '#2673f0' : btnStrikethrough.style.color = 'black';
            parentElement.localName==="u" ? btnUnderline.style.color = '#2673f0' : btnUnderline.style.color = 'black';
            // parentElement.localName==="justifyLeft" ? btnLeft.style.color = '#2673f0' : btnLeft.style.color = 'black';
            // parentElement.localName==="justifyCenter" ? btnCenter.style.color = '#2673f0' : btnCenter.style.color = 'black';
            // parentElement.localName==="justifyRight" ? btnRight.style.color = '#2673f0' : btnRight.style.color = 'black';

            if(parentElement.localName==='div') break;

            parentElement = parentElement.parentElement;
        }

        // console.log("parentElement.localName: "+parentElement.localName)
        // console.log("parentElement.parentElement.localName: "+parentElement.parentElement.localName)
        // console.log(parentElement.localName==='div')

        // console.log(range)
        // console.log(range.startContainer.parentNode)
        // console.log(range.startContainer.parentElement.localName)

        // console.log(range.startContainer.parentElement.parentElement.parentElement)
        // console.log(range.startContainer.parentElement.parentElement)
        // console.log(range.startContainer.parentElement)
        // 찍힌 range 기준으로 서식 버튼 동기화
        // range.startContainer.parentElement가 div가 될 때 까지 나오는 서식의 버튼 활성화
    }

    // document.queryCommandState("bold") ? btnBold.style.color = '#2673f0' : btnBold.style.color = 'black';
    // document.queryCommandState("italic") ? btnItalic.style.color = '#2673f0' : btnItalic.style.color = 'black';
    // document.queryCommandState("underline") ? btnUnderline.style.color = '#2673f0' : btnUnderline.style.color = 'black';
    // document.queryCommandState("strikeThrough") ? btnStrikethrough.style.color = '#2673f0' : btnStrikethrough.style.color = 'black';
    // document.queryCommandState("justifyLeft") ? btnLeft.style.color = '#2673f0' : btnLeft.style.color = 'black';
    // document.queryCommandState("justifyCenter") ? btnCenter.style.color = '#2673f0' : btnCenter.style.color = 'black';
    // document.queryCommandState("justifyRight") ? btnRight.style.color = '#2673f0' : btnRight.style.color = 'black';
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