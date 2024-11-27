interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
  xlabel: number;
  ylabel: number;
}

export class SvgConfig {
  svgWidth: number;
  svgHeight: number;
  margin: Margin;

  constructor(svgWidth: number, svgHeight: number, margin: Margin) {
    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
    this.margin = margin;
  }

  get innerWidth(): number {
    return (
      this.svgWidth - this.margin.left - this.margin.right - this.margin.xlabel
    );
  }

  get innerHeight(): number {
    return (
      this.svgHeight - this.margin.top - this.margin.bottom - this.margin.ylabel
    );
  }
}
