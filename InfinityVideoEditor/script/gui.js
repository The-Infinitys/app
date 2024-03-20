//メモリ取得(プロジェクト用)
var importedSources = [];
var ProjectJSON = {
  title: "",
  sources: [], //here is the name of source file.
  sprites: {}, //Here is the data of sprite.
};
const sprite_video = {
  name: "",
  source: {
    name: "",
    start: 0,
    speed: 1,
  },
  start_time: 0,
  duration: 0,
  animation: [],
};

const sprite_image = {
  name: "",
  source: "",
  start_time: 0,
  duration: 0,
  animation: [],
};

const sprite_text = {
  name: "",
  source: {
    text: "",
    font: "",
  },
  start_time: 0,
  duration: 0,
  animation: [],
};
//
let current_time=0;
//ファイルの読み込み
document
  .getElementById("file-dialog-source")
  .addEventListener("change", (e) => {
    const files = document.getElementById("file-dialog-source").files;
    for (let i = 0; i < files.length; ++i) {
      file = files[i];
      importedSources.append(file);
      console.info('imported the file named "' + file.name + '".');
    }
  });

document
  .getElementById("file-dialog-project")
  .addEventListener("change", (e) => {
    alert("現在作成中です...");
  });

//描画
//画面上の動きを作る。

//left menu
function swapFullScreen() {
  let screen = document.getElementById("screen");
  screen.style = "top:0;left:0;width:100%;height:90%;";
  let controller=document.getElementById("playControler");
  controller.style="top:90%;left:0;width:100%;height:10%;";
  let normalScreen=document.getElementById("normalScreen");
  normalScreen.style.visibility="visible";
}
//swapFullScreenを元に戻す為
function normalScreen(){

  let screen = document.getElementById("screen");
  screen.style = "";
  let controller=document.getElementById("playControler");
  controller.style="";
  let normalScreen=document.getElementById("normalScreen");
  normalScreen.style.visibility="hidden";
}
function importFile() {
  //ソース(動画、画像、音声)をimportする為にボタンを押させる関数
  let dialoger = document.getElementById("file-dialog-source");
  dialoger.click();
}

function importProject() {
  //プロジェクトをimportする為にボタンを押させる関数
  let dialoger = document.getElementById("file-dialog-project");
  dialoger.click();
}

function backEditorMenu() {
  document.getElementById("editor-back").style.visibility = "hidden";
  editorMenus = document.getElementsByClassName("editor-menus");
  for (let i = 0; i < editorMenus.length; ++i) {
    editorMenus[i].style.visibility = "hidden";
  }
  document.getElementById("editor-menu-main").style.visibility = "visible";
}

function menu_open_AddElement() {
  document.getElementById("editor-menu-main").style.visibility = "hidden";
  document.getElementById("editor-menu-sub").style.visibility = "visible";
  document.getElementById("editor-menu-addElem").style.visibility = "visible";
  document.getElementById("editor-back").style.visibility = "visible";
  document.getElementById("editor-subtitle").innerHTML = "add Element";
}

//test
setInterval(()=>{
  let current_time_display=document.getElementById("current-time");
  let selector=document.getElementById("selector");
  current_time=selector.scrollLeft;
  selector.scrollLeft=Math.max(0,selector.scrollLeft);
  selector.scrollLeft=Math.min(selector.scrollLeft,selector.scrollWidth);
  current_time_display.innerHTML=current_time;
},10);