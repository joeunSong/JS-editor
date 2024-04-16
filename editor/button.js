// 서식 버튼 동기화 함수
function CheckFormat() {
    const editMode = document.querySelector("#editMode");
        const selection = document.getSelection();

        const btnBold = document.querySelector("#bold");
        const btnItalic = document.querySelector("#italic");
        const btnStrikethrough = document.querySelector("#strikeThrough");
        const btnUnderline = document.querySelector("#underline");
        // todo. 목록 버튼 동기화
        const btnLeft = document.querySelector("#justifyLeft");
        const btnCenter = document.querySelector("#justifyCenter");
        const btnRight = document.querySelector("#justifyRight");
        
        document.queryCommandState("bold") ? btnBold.style.color = '#2673f0' : btnBold.style.color = 'black'
        document.queryCommandState("italic") ? btnItalic.style.color = '#2673f0' : btnItalic.style.color = 'black'
        document.queryCommandState("strikeThrough") ? btnStrikethrough.style.color = '#2673f0' : btnStrikethrough.style.color = 'black'
        document.queryCommandState("underline") ? btnUnderline.style.color = '#2673f0' : btnUnderline.style.color = 'black'

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
function ChangeMode (obj) {
    const editMode = document.querySelector("#editMode");
    const htmlMode = document.querySelector("#htmlMode");
    const preViewMode = document.querySelector("#preViewMode");

    console.log(obj.value)
    console.log(editMode.style.display)
    switch(obj.value){
        case "edit" :
            editMode.style.display = 'block'
            htmlMode.style.display = 'none'
            preViewMode.style.display = 'none'
            break;
        case "html" :
            htmlMode.innerHTML = editMode.innerHTML
            editMode.style.display = 'none'
            htmlMode.style.display = 'block'
            preViewMode.style.display = 'none'
            console.log(editMode.innerHTML)
            break;
        case "preview" :
            editMode.style.display = 'none'
            htmlMode.style.display = 'none'
            preViewMode.style.display = 'block'
            break;
    }
}

