source = {
  setAllSource: (type) => {
    const div = document.querySelector("#editor-menu-elemEditor-source");
    if (type == "text") {
      div.innerHTML='<h1>text</h1><p style=""></p>';
    } else {
      div.innerHTML='<h1>source</h1><select id="editor-menu-elemEditor-source-list"></select>';
      console.log(type);
      const select = document.querySelector("#editor-menu-elemEditor-source-list");
      select.innerHTML = "";//selectのリセット
      const sources = document.querySelector("#Element-sources");
      for (let i = 0; i < sources.children.length; ++i) {
        const source = {
          type: sources.children[i].children[0].innerHTML,
          name: sources.children[i].children[1].innerHTML,
        };
        if (source.type == type) {
          const option = document.createElement("option");
          option.value = source.name;
          option.innerHTML = source.name;
          select.appendChild(option);
        }
      }
    }
  }
}
const createElementSource = file => {
  let elem = document.createElement("div");
  let source = null;
  const reader = new FileReader();
  if (file.type.startsWith("image")) {
    elem.innerHTML = "<div>image</div>";
    source = document.createElement("image");
  } else if (file.type.startsWith("video")) {
    elem.innerHTML = "<div>video</div>";
    source = document.createElement("video");
  } else {
    elem.innerHTML = "<div>audio</div>";
    source = document.createElement("audio");
  }
  elem.innerHTML += "<div>" + file.name + "</div>"
  reader.onload = (e) => {
    source.src = e.target.result;
    elem.appendChild(source);
    document.querySelector("#Element-sources").appendChild(elem);
  };
  reader.readAsDataURL(file);
}