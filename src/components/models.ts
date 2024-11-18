export interface Exercise {
  id: number;
  label: string;
  path: string;
  caption: string;
}

export interface WeeklyExercises {
  week: string;
  label: string;
  exercises: Exercise[];
}

export interface RawData {
  group: number;
  series: number;
  value: number;
}

export interface StackedBarChartData {
  group: number;
  series: number;
  value: number;
  y0: number;
  y1: number;
}

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
