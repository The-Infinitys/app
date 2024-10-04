document
  .querySelector("div.main>div.ui>div.overtone>div.control>div.manage>button")
  .addEventListener("click", () => {
    const overtone_input = document.createElement("input");
    overtone_input.type = "range";
    document
      .querySelector("div.main>div.ui>div.overtone>div.control")
      .append(
        overtone_input,
        document.querySelector(
          "div.main>div.ui>div.overtone>div.control>div.manage"
        )
      );
  });
