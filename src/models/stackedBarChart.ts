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
