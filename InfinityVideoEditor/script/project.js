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
      project.elem.scope=this.info.name;
      gui.editor.open("elemEditor");
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
    start: document.querySelector("#elemEditor-name"),
    length: document.querySelector("#elemEditor-name"),
    layer: document.querySelector("#elemEditor-name"),
    x: document.querySelector("#elemEditor-name"),
    y: document.querySelector("#elemEditor-name"),
    direction: document.querySelector("#elemEditor-name"),
    size: document.querySelector("#elemEditor-name"),
    renew: (editor_name) => {
      switch (editor_name) {
        case "name":
          project.getProjectElement(project.scope).info.name = project.elemEditor.name.value;
          break;
        case "start":
          project.getProjectElement(project.scope).info.start = project.elemEditor.start.value;
          break;
        case "length":
          project.getProjectElement(project.scope).info.length = project.elemEditor.length.value;
          break;
        case "layer":
          project.getProjectElement(project.scope).info.layer = project.elemEditor.layer.value;
          break;
        default:
          break;
      }
      project.elemEditor.elem.renewElem();
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
    getProjectElement: (name) => {
      const elemIndex = project.elems.findIndex((e) => {
        return e.info.name == name;
      });
      return project.elem[elemIndex];
    },
  },
};
