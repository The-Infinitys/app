class element {
  constructor(type) {
    this.info = {
      type: type, //video image text audioのどれかが入る
      name: type + Math.floor(Math.random() * 10000).toString(),
      start: project.currentTime(),
      length: 1,
      layer: 1,
      animation: {
        0: {
          data: {
            pos: {
              x: 0,
              y: 0,
            },
            direction: 0,
            size: 100,
            effects: {},
          },
          easing: {
            type: "linear",
            args: {},
          },
        },
        1: {
          data: {
            pos: {
              x: 0,
              y: 0,
            },
            direction: 0,
            size: 100,
            effects: {},
          },
          easing: {
            type: "linear",
            args: {},
          },
        },
      },
    };
    switch (type) {
      case "video":
        this.info.video = { source: null, start: 0, speed: 1 };
        break;
      case "image":
        this.info.image = { source: null };
        break;
      case "audio":
        this.info.audio = { source: null, start: 0, speed: 1 };
        break;
      case "text":
        this.info.text = { str_data: "", style: "" };
        break;
      default:
        break;
    }
    let elem = document.createElement("buttom");
    elem.className = "elem_button";
    this.info.layer = project.elem.check_empty_layer_on(this.info.start, this.info.length) + 1;
    this.elem = elem;
    this.renewElem();
    document.querySelector("#selector-main").appendChild(this.elem);
  }
  renewElem() {
    this.elem.style.setProperty("--elem-type", "var(--elem-type-" + this.info.type + ")");
    this.elem.style.setProperty("--length", this.info.length);
    this.elem.style.setProperty("--start", this.info.start);
    this.elem.style.setProperty("--layer", this.info.layer);
    const icon = document.querySelector(".elem-icon-" + this.info.type);
    icon.style = "width:5vh;height:100%;left:0;";
    this.elem.innerHTML = icon.outerHTML + this.info.name;
    this.elem.onclick = () => {
      project.elem.scope = this.info.name;
      gui.editor.open("elemEditor");
      let elemindex = project.elem.getProjectElementIndex(project.elem.scope);
      project.elemEditor.name.value = project.elems[elemindex].info.name;
      project.elemEditor.start.value = project.elems[elemindex].info.start;
      project.elemEditor.length.value = project.elems[elemindex].info.length;
      project.elemEditor.layer.value = project.elems[elemindex].info.layer;
    };
  }
}
function checkRange(a, b, c, d) {
  let min = Math.max(a, c);
  let max = Math.min(b, d);
  return min <= max;
}

project = {
  elems: [],
  currentTime: () => {
    return parseFloat(document.querySelector("#current-time").innerHTML);
  },
  video_length: () => {
    return parseFloat(document.querySelector("#video_length").innerHTML);
  },
  elemEditor: {
    name: document.querySelector("#elemEditor-name"),
    start: document.querySelector("#elemEditor-start"),
    length: document.querySelector("#elemEditor-length"),
    layer: document.querySelector("#elemEditor-layer"),
    renew: (editor_name) => {
      let element = project.elems[project.elem.getProjectElementIndex(project.elem.scope)];
      switch (editor_name) {
        case "name":
          element.info.name = project.elemEditor.name.value;
          break;
        case "start":
          element.info.start = project.elemEditor.start.value;
          break;
        case "length":
          element.info.length = project.elemEditor.length.value;
          break;
        case "layer":
          element.info.layer = project.elemEditor.layer.value;
          break;
        default:
          break;
      }
      element.renewElem();
    },
  },
  elem: {
    add: (type) => {
      if (type == "video" || type == "image" || type == "text" || type == "audio") {
        project.elems.push(new element(type));
      } else {
        console.error("I don't know", type, "elem... (By project manager)");
        return false;
      }
      project.json.elems.append(result);
    },
    check_max_layer_on: (start, length) => {
      let end = start + length;
      let result = 0;
      for (let i = 0; i < project.elems.length; ++i) {
        const info = project.elems[i].info;
        const data = { start: info.start, length: info.length, end: info.start + info.length, layer: info.layer };
        if (checkRange(start, end, data.start, data.end) && result < data.layer) {
          result = data.layer;
        }
      }
      return result;
    },
    check_empty_layer_on: (start, length) => {
      let end = start + length;
      let result = 0;
      for (let i = 0; i < project.elems.length; ++i) {
        const info = project.elems[i].info;
        const data = { start: info.start, length: info.length, end: info.start + info.length, layer: info.layer };
        if (checkRange(start, end, data.start, data.end) && result + 1 == data.layer) {
          result = data.layer;
        }
      }
      return result;
    },
    scope: null,
    getProjectElementIndex: (name) => {
      return project.elems.findIndex((e) => {
        return e.info.name == name;
      });
    },
  },
};


//import file
document.getElementById("file-dialog-source").addEventListener("change", (e) => {
  const element = document.getElementById("file-dialog-source");
  for (let i = 0; i < element.files.length; ++i) {
    createElementSource(element.files[i]);
  }
});