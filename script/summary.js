async function sumStart() {
    await includeHTML();
    document.getElementById("firstRowCont1").classList.add("bg-darkblue");
    document.getElementById("firstRowCont2").classList.add("bg-darkblue");
};

function changeColor1() {
    document.getElementById("firstRowCont1").classList.remove("bg-darkblue");
    document.getElementById('firstRowCont1').classList.add("bg-white");
    document.getElementById("sumEdit").src = "../assets/icons/edit-black.svg";
};

function recreateColor1() {
    document.getElementById('firstRowCont1').classList.remove("bg-white");
    document.getElementById("firstRowCont1").classList.add("bg-darkblue");
    document.getElementById("sumEdit").src = "../assets/icons/edit-white.svg";
};

function changeColor2() {
    document.getElementById("firstRowCont2").classList.remove("bg-darkblue");
    document.getElementById('firstRowCont2').classList.add("bg-white");
    document.getElementById("sumHook").src = "../assets/icons/hook-black.svg";
};

function recreateColor2() {
    document.getElementById("firstRowCont2").classList.add("bg-darkblue");
    document.getElementById('firstRowCont2').classList.remove("bg-white");
    document.getElementById("sumHook").src = "../assets/icons/hook-white.svg";
};