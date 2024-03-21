//メモリ取得(プロジェクト用)
//
let current_time = 0;
let is_played = false;
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
  let controller = document.getElementById("playControler");
  controller.style = "top:90%;left:0;width:100%;height:10%;";
  let normalScreen = document.getElementById("normalScreen");
  normalScreen.style.visibility = "visible";
}
//swapFullScreenを元に戻す為
function normalScreen() {
  let screen = document.getElementById("screen");
  screen.style = "";
  let controller = document.getElementById("playControler");
  controller.style = "";
  let normalScreen = document.getElementById("normalScreen");
  normalScreen.style.visibility = "hidden";
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

function scrollCurrentTime() {
  let current_time_display = document.getElementById("current-time");
  let selector = document.getElementById("selector");
  selector.scrollLeft = Math.max(0, selector.scrollLeft);
  selector.scrollLeft = Math.min(selector.scrollLeft, selector.scrollWidth);
  current_time = selector.scrollLeft / 100;
  let display_result = current_time.toString();
  current_time_display.innerHTML = display_result.padEnd(
    display_result.lastIndexOf(".") + 3,
    "0"
  );
  if (current_time == 0) current_time_display.innerHTML = "0.00";
}
function renewCurrentTime(){
  let current_time_display = document.getElementById("current-time");
  let selector = document.getElementById("selector");
  let display_result = current_time.toString();
  selector.scrollLeft=current_time/100;
  current_time_display.innerHTML = display_result.padEnd(
    display_result.lastIndexOf(".") + 3,
    "0"
  );
  if (current_time == 0) current_time_display.innerHTML = "0.00";
}

function swapPlay() {
  let button = document.getElementById("play-and-stop").children[0];
  if (is_played) {
    button.innerHTML = `
        <polygon points="10 0, 10 100, 90 50" />
      `;
  } else {
    button.innerHTML = `
        <polygon points="10 5, 10 95,30 95,30 5" />
        <polygon points="90 5, 90 95,70 95,70 5" />
      `;
  }
  is_played = !is_played;
}

function go_first(){
  current_time=0;
  renewCurrentTime();
}

let FPS = Infinity;
let Dt = 0;
let before = Date.now();
function checkFPS() {
  Dt = (Date.now() - before)/1000;
  FPS = 1 / Dt;
  before = Date.now();
  requestAnimationFrame(checkFPS);
}
checkFPS();

let play = {
  selector: () => {
    if (is_played) {
      let selector = document.getElementById("selector");
      Dt = (Date.now() - before)/1000;
      FPS = 1 / Dt;
      before = Date.now();
      current_time+=Dt;
      selector.scrollLeft = current_time * 100;
      let display_result = current_time.toString();
    }
    requestAnimationFrame(play.selector);
  },
};
play.selector();
