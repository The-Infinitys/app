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

project = {
  json: {
    elems: [],
    meta: {
      UA: navigator.userAgent,
    },
  },
  currentTime: () => {
    return parseFloat(document.querySelector("#current-time").innerHTML);
  },
  video_length: () => {
    return parseFloat(document.querySelector("#video_length").innerHTML);
  },
  elem: {
    add: (type) => {
      let result = elem;
      if (type == "video") {
        result.video = {};
        result.video.source = "";
        result.video.start = "0";
        result.video.speed = 1;
      } else if (type == "image") {
        result.image = {};
        result.image.source = "";
        result.image.crip = null;
      } else if (type == "text") {
        result.text = {};
        result.text.data = "";
        result.text.style = "";
      } else if (type == "audio") {
        result.audio = {};
        result.audio.source = "";
        result.audio.start = 0;
        result.audio.speed = 1;
      } else {
        console.error("I don't know", type, "elem... (By project manager)");
        return false;
      }
      project.json.elems.append(result);
    },
  },
};
