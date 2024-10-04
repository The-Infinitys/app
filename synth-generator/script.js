const overtone = () => {
  document
    .querySelector(
      "div.main>div.ui>div.overtone>div.control>div.manage>button.add"
    )
    .addEventListener("click", () => {
      console.log("add new parameter");
      const overtone_input = document.createElement("input");
      overtone_input.type = "range";
      overtone_input.setAttribute("min", "0");
      overtone_input.setAttribute("max", "100");
      overtone_input.setAttribute("step", "1");
      document
        .querySelector("div.main>div.ui>div.overtone>div.control")
        .insertBefore(
          overtone_input,
          document.querySelector(
            "div.main>div.ui>div.overtone>div.control>div.manage"
          )
        );
    });
  document
    .querySelector(
      "div.main>div.ui>div.overtone>div.control>div.manage>button.remove"
    )
    .addEventListener("click", () => {
      console.log("remove parameter");
      const control = document.querySelector(
        "div.main>div.ui>div.overtone>div.control"
      );
      if (control.children.length > 2) {
        control.children[control.children.length - 2].remove();
      }
    });
  const init_pulse = () => {
    const canvas = document.querySelector(
      "div.main>div.ui>div.overtone>div.control>div.manage>button.removediv.main>div.ui>div.overtone>canvas.display"
    );
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  init_pulse();
  const renew_pulse = () => {
    const canvas = document.querySelector(
      "div.main>div.ui>div.overtone>canvas.display"
    );
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    const params = [];
    const control = document.querySelector(
      "div.main>div.ui>div.overtone>div.control"
    );
    for (let i = 0; i < control.children.length - 1; i++) {
      params.push(parseInt(control.children[i].value)/100);
    }
    for (let i = 0; i < canvas.width; i++) {
      let value = 0;
      for (let param_index = 0; param_index < params.length; param_index++) {
        const percentage = i / canvas.width;
        value +=
          params[param_index] *
          Math.sin(2 * Math.PI * percentage * (param_index + 1));
      }
      ctx.lineTo(i, canvas.height * value + canvas.height / 2);
    }
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.stroke();
    requestAnimationFrame(renew_pulse);
  };
  renew_pulse();
};
overtone();
