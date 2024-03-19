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
  screen = document.getElementById("screen");
  screen.style.zIndex = "10";
  screen.style.top = "0";
  screen.style.left = "0";
  screen.style.width = "100%";
  screen.style.height = "100%";
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
