import { h } from "hastscript";
import type { ShikiTransformer } from "shiki";

export const codeSnippetTransformer = (): ShikiTransformer => {
  return {
    name: "shiki-transformer-code-snippet",
    pre(node) {
      const { meta } = this.options;

      // Create a figure element
      const figure = h(
        "figure",
        {
          class: "code-snippet lang-plaintext",
          style: "position: relative;",
        },
        node,
      );

      // Check if the meta contains a filename
      const matchFilename = meta?.__raw?.match(/filename=['"]([^'"]+)['"]/);
      const figcaption = h("figcaption", { class: "header" }, []);
      if (matchFilename) {
        // Add a title to the figure element
        if (Array.isArray(figure.properties.className))
          figure.properties.className.push("has-title");
        const fileName = matchFilename[0]
          .replace('filename="', "")
          .replace("filename='", "")
          .replace('"', "")
          .replace("'", "");
        figcaption.children.push(h("span", { class: "title" }, fileName));
      }

      const buttonContainer = h("div", { class: "btn-container" }, []);

      const matchCollapsible = meta?.__raw?.includes("collapsable");

      if (matchCollapsible) {
        const button = addCollapsibleCodeBlock(!!matchFilename);
        if (Array.isArray(figure.properties.className)) {
          figure.properties.className.push("collapsable");
        }
        figure.children.push(createExpandButton());
        if (matchFilename) {
          figcaption.children.push(button);
        } else {
          buttonContainer.children.push(button);
        }
      }

      const matchNoCopy = meta?.__raw?.includes("nocopy");

      if (!matchNoCopy) {
        const button = createCopyButton(this.source, !!matchFilename);
        if (matchFilename) {
          figcaption.children.push(button);
        } else {
          buttonContainer.children.push(button);
        }
      }

      figure.children.push(buttonContainer);

      figure.children.unshift(figcaption);
      return figure;
    },
    root(hast) {
      const rootCopy = { ...hast };
      const figure = rootCopy.children[0];
      const pre = (figure as any).children[1];
      const code = pre.children[0];
      const numOfLines = code.children.length;
      if (
        code.children[numOfLines - 1].children.length === 0 ||
        code.children[numOfLines - 1].children[0].children[0].value === ""
      ) {
        code.children.pop();
        code.children.pop();
      }
      if (code.children.length === 1) {
        (figure as any).properties.className.push("one-line-btn-container");
      }
      return rootCopy;
    },
  };
};

const createCopyButton = (code: string, fotTitle: boolean) => {
  return h(
    "button",
    {
      ariaLabel: "Copy",
      "data-copy-btn": "",
      class: `button-wrap${fotTitle ? " button-wrap--title" : ""}`,
      "data-code": code,
    },
    [createReadySvg(), createHastSuccessSvg()],
  );
};

const createReadySvg = () => {
  return h(
    "svg",
    {
      class: "ready",
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
    },
    [
      h("path", {
        d: "M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      h("path", {
        d: "M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
    ],
  );
};

const createHastSuccessSvg = () => {
  return h(
    "svg",
    {
      class: "success",
      width: "20",
      height: "20",
      viewBox: "0 0 12 12",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
    },
    [
      h("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10.0242 3.1758C10.1367 3.28832 10.1999 3.4409 10.1999 3.6C10.1999 3.7591 10.1367 3.91168 10.0242 4.0242L5.2242 8.8242C5.11168 8.93668 4.9591 8.99987 4.8 8.99987C4.6409 8.99987 4.48832 8.93668 4.3758 8.8242L1.9758 6.4242C1.86651 6.31104 1.80603 6.15948 1.8074 6.00216C1.80876 5.84484 1.87186 5.69435 1.98311 5.58311C2.09435 5.47186 2.24484 5.40876 2.40216 5.4074C2.55948 5.40603 2.71104 5.46651 2.8242 5.5758L4.8 7.5516L9.1758 3.1758C9.28832 3.06332 9.4409 3.00013 9.6 3.00013C9.7591 3.00013 9.91168 3.06332 10.0242 3.1758Z",
      }),
    ],
  );
};

export const addCollapsibleCodeBlock = (fotTitle: boolean) => {
  return h(
    "button",
    {
      ariaLabel: "Expand/Collapse",
      class: `button-wrap${fotTitle ? " button-wrap--title" : ""}`,
      onclick:
        "this.parentElement.parentElement.classList.toggle('collapsable')",
    },
    [createExpandButtonSvg(), createCollapseButtonSvg()],
  );
};

const createCollapseButtonSvg = () => {
  return h("div", { class: "collapse-icon" }, [
    h(
      "svg",
      {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg",
      },
      [
        h("path", {
          d: "M8.67383 17.3689L12.0427 14L15.4116 17.3689",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
        h("path", {
          d: "M15.4116 6.7164L12.0427 10.0853L8.67383 6.7164",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
        h("path", {
          d: "M12.0426 14V22.0853",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
        h("path", {
          d: "M12.0426 10.0853V1.99999",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
      ],
    ),
  ]);
};

const createExpandButtonSvg = () => {
  return h("div", { class: "expand-icon" }, [
    h(
      "svg",
      {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg",
      },
      [
        h("path", {
          d: "M8.67383 5.36887L12.0427 2L15.4116 5.36887",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
        h("path", {
          d: "M15.4116 18.8443L12.0427 22.2132L8.67383 18.8443",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
        h("path", {
          d: "M12.0426 2.00003V10.0853",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
        h("path", {
          d: "M12.0426 22.2132V14.1279",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
      ],
    ),
  ]);
};

const createExpandButton = () => {
  return h("div", { class: "expand-button-wrap" }, [
    h(
      "div",
      {
        "data-expand-button": "",
        class: "expand-button",
        onclick:
          "this.parentElement.parentElement.classList.toggle('collapsable')",
      },
      "Expand",
    ),
  ]);
};
