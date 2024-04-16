class element {
  constructor(type) {
    this.info = {
      type: type, //video image text audioのどれかが入る
      name:type+Math.floor(Math.random()*10000).toString(),
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
    this.info.layer = project.elem.check_empty_layer_on(this.info.start, this.info.length)+1;
    this.elem = elem;
    this.renewElem();
    document.querySelector("#selector-main").appendChild(this.elem);
  }
  renewElem() {
    this.elem.style.setProperty("--elem-type", "var(--elem-type-" + this.info.type + ")");
    this.elem.style.setProperty("--length", this.info.length);
    this.elem.style.setProperty("--start", this.info.start);
    this.elem.style.setProperty("--layer", this.info.layer);
    const icon=document.querySelector(".elem-icon-"+this.info.type);
    icon.style="width:5vh;height:100%;left:0;";
    console.log(icon.outerHTML);
    this.elem.innerHTML=icon.outerHTML+this.info.name;
  }
}
function checkRange(a, b, c, d) {
  let min=Math.max(a,c);
  let max=Math.min(b,d);
  return min<=max;
}

project = {
  elems: [],
  currentTime: () => {
    return parseFloat(document.querySelector("#current-time").innerHTML);
  },
  video_length: () => {
    return parseFloat(document.querySelector("#video_length").innerHTML);
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
        data = project.elems[i].info;
        data = { start: data.start, length: data.length, end: data.start + data.length, layer: data.layer };
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
        data = project.elems[i].info;
        data = { start: data.start, length: data.length, end: data.start + data.length, layer: data.layer };
        if (checkRange(start, end, data.start, data.end) && result+1 == data.layer) {
          result = data.layer;
        }
      }
      return result;
    }
  },
};
