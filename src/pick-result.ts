export type PickResult = (
  selector: string,
) => (
  getHREFFromResult: (result: HTMLAnchorElement) => string,
) => (i: number) => void;

const pickResult: PickResult = selector => getHREFFromResult => i => {
  const results = document.querySelectorAll<HTMLAnchorElement>(selector);

  const result = results[i];

  const pointer = document.getElementById("result-pointer") || {
    remove: () => {},
  };

  pointer.remove();

  result.innerHTML = `
  <div
    id="result-pointer"
    style="position: absolute; margin-left: -15px;"
  >
    &gt;
  </div>
      ${result.innerHTML}`;

  document.onkeyup = ({ key }) => {
    switch (key) {
      case "ArrowUp":
        pickResult(selector)(getHREFFromResult)(i > 0 ? i - 1 : 0);
        break;
      case "ArrowDown":
        pickResult(selector)(getHREFFromResult)(
          i < results.length - 2 ? i + 1 : i,
        );
        break;
      case "Enter":
        window.open(getHREFFromResult(result), "_blank");
        break;
      default:
        break;
    }
  };
};

export default pickResult;
