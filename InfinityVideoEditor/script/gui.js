gui = {
  video_length: () => {
    return parseFloat(document.querySelector("#video_length").innerHTML);
  },
  left_menu: {
    fullScreen: () => {
      const screen = document.getElementById("screen");
      const controller = document.getElementById("playControler");
      const normalScreen = document.getElementById("normalScreen");
      if (normalScreen.style.visibility == "visible") {
        //最大化解除
        screen.style = "";
        controller.style = "";
        normalScreen.style.visibility = "hidden";
      } else {
        //画面最大化
        screen.style = "top:0;left:0;width:100%;height:90%;";
        controller.style = "top:90%;left:0;width:100%;height:10%;";
        normalScreen.style.visibility = "visible";
      }
    },
  },
  editor: {
    back: () => {
      document.getElementById("editor-back").style.visibility = "hidden";
      editorMenus = document.getElementsByClassName("editor-menus");
      for (let i = 0; i < editorMenus.length; ++i) {
        editorMenus[i].style.visibility = "hidden";
      }
      document.getElementById("editor-menu-main").style.visibility = "visible";
      document.getElementById("editor-subtitle").innerHTML = "";
    },
    importFile: () => {
      document.getElementById("file-dialog-source").click();
    },
    importProject: () => {
      document.getElementById("file-dialog-project").click();
    },
    open: (name) => {
      if (document.getElementById("editor-subtitle").innerHTML != "") {
        gui.editor.back();
      }
      document.getElementById("editor-menu-main").style.visibility = "hidden";
      document.getElementById("editor-menu-sub").style.visibility = "visible";
      document.getElementById("editor-back").style.visibility = "visible";
      document.getElementById("editor-subtitle").style.visibility = "visible";
      if (name == "addElem") {
        document.getElementById("editor-menu-addElem").style.visibility =
          "visible";
        document.getElementById("editor-subtitle").innerHTML = "add Element";
      } else if (name == "elemEditor") {
        document.getElementById("editor-menu-elemEditor").style.visibility =
          "visible";
        document.getElementById("editor-subtitle").innerHTML = "edit Element";
      } else if (name == "elemEditor-source") {
        document.getElementById("editor-menu-elemEditor-source").style.visibility =
          "visible";
        document.getElementById("editor-subtitle").innerHTML = "edit source";
      } else if (name == "elemEditor-anmation") {
        document.getElementById("editor-menu-elemEditor-animation").style.visibility =
          "visible";
        document.getElementById("editor-subtitle").innerHTML = "edit anmation";
      }
    },
  },
  player: {
    current_time: 0,
    is_played: false,
    scroll: () => {
      const selector = document.getElementById("selector");
      selector.scrollLeft = Math.max(0, selector.scrollLeft);
      selector.scrollLeft = Math.min(selector.scrollLeft, selector.scrollWidth);
      gui.player.current_time = selector.scrollLeft / 100;
      gui.player.renew();
    },
    renew: () => {
      const current_time_display = document.getElementById("current-time");
      let display_result = (
        Math.round(gui.player.current_time * 100) / 100
      ).toString();
      if (display_result.lastIndexOf(".") == -1) display_result += ".";
      current_time_display.innerHTML = display_result.padEnd(
        display_result.lastIndexOf(".") + 3,
        "0"
      );
      document.documentElement.style.setProperty(
        "--video_length",
        gui.video_length()
      );
      requestAnimationFrame(gui.player.renew);
    },
    swapPlay: () => {
      const button = document.getElementById("play-and-stop").children[0];
      if (gui.player.is_played) {
        button.innerHTML = `
            <polygon points="10 0, 10 100, 90 50" />
          `;
      } else {
        button.innerHTML = `
            <polygon points="10 5, 10 95,30 95,30 5" />
            <polygon points="90 5, 90 95,70 95,70 5" />
          `;
      }
      gui.player.is_played = !gui.player.is_played;
    },
    first: () => {
      gui.player.current_time = 0;
      document.getElementById("selector").scrollLeft = 0;
      gui.player.renew();
    },

    last: () => {
      gui.player.current_time = gui.video_length();
      const selector = document.getElementById("selector");
      selector.scrollLeft = selector.scrollWidth;
      gui.player.renew();
    },
    playing: {
      lastplayed: 0,
      startedDate: Date.now(),
      play: () => {
        if (gui.player.is_played) {
          const selector = document.getElementById("selector");
          gui.player.current_time =
            (Date.now() - gui.player.playing.startedDate) / 1000 +
            gui.player.playing.lastplayed;
          selector.scrollLeft = gui.player.current_time * 100;
          if (gui.player.current_time > gui.video_length()) {
            gui.player.current_time = gui.video_length();
            gui.player.swapPlay();
          }
        } else {
          gui.player.playing.lastplayed = gui.player.current_time;
          gui.player.playing.startedDate = Date.now();
        }
        requestAnimationFrame(gui.player.playing.play);
      },
    },
  },
};
gui.player.renew();
gui.player.playing.play();
