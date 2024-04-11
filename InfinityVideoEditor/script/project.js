class element {
  constructor(type) {
    this.info = {
      type: type, //video image text audioのどれかが入る
      start: project.currentTime(),
      length: 1,
      layer:1,
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
    let elem=document.createElement("buttom");
    elem.className="elem_buttom";
    this.elem=elem;
    this.renewElem();
    document.querySelector("#selector-main").appendChild(this.elem);
  }
  renewElem(){
    this.elem.style.setProperty("--elem-type","var(--elem-type-"+this.info.type+")");
    this.elem.style.setProperty("--length",this.info.length);
    this.elem.style.setProperty("--start",this.info.start);
    this.elem.style.setProperty("--layer",this.info.layer);
  }
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
        project.elems.append(new element(type));
      } else {
        console.error("I don't know", type, "elem... (By project manager)");
        return false;
      }
      project.json.elems.append(result);
    },
  },
};
