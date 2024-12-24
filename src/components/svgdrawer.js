export default class SVGDrawer {
    constructor(container) {
        this.container = container;
        this.svgNS = "http://www.w3.org/2000/svg";
        this.svg = document.createElementNS(this.svgNS, "svg");
        this.container.appendChild(this.svg);
    }

    clear() {
        while (this.svg.firstChild) {
            this.svg.removeChild(this.svg.firstChild);
        }
    }

    drawPath(pathData, offsetX, offsetY, fillColor) {
        const path = document.createElementNS(this.svgNS, "path");
        path.setAttribute("d", pathData);
        path.setAttribute("fill", fillColor);
        path.setAttribute("transform", `translate(${offsetX}, ${offsetY})`);
        this.svg.appendChild(path);
    }

    setSize(width, height) {
        this.svg.setAttribute("width", width);
        this.svg.setAttribute("height", height);
    }
}