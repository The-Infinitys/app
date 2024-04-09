const elem = {
  type: null, //video image text audioのどれかが入る
  start: 0,
  length: 0,
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

class element {
  constructor(type) {
    this.info = elem;
    this.buttom = document.createElement("buttom");
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
