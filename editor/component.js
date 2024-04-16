// 서식 버튼 모듈화
function FormatButton (parent, id, icon) {
    let parentDiv = document.querySelector(`.${parent}`);
    let newBtn = document.createElement("button");
    let newI = document.createElement('i');
    newI.className = icon;
    newBtn.appendChild(newI);
    newBtn.id = id;
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
    // console.log(newBtn.style)
    parentDiv.appendChild(newBtn)
}