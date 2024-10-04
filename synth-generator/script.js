document
  .querySelector(
    "div.main>div.ui>div.overtone>div.control>div.manage>button.add"
  )
  .addEventListener("click", () => {
    console.log("add new parameter");
    const overtone_input = document.createElement("input");
    overtone_input.type = "range";
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
      control.children[
        control.children.lengthcontrol.children.length - 2
      ].remove();
    }
  });
