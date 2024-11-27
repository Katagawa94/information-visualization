export default class CsvContent {
  private _data: string[][];
  private _metaData: string[][] | undefined;

  constructor(
    content: string,
    splitChar: string = ',',
    discardRows: number = 0
  ) {
    const rows = content.split('\n');
    if (discardRows > 0) {
      const metaDataRows = rows.splice(0, discardRows);
      this._metaData = metaDataRows.map((row) => row.split(splitChar));
    }
    this._data = rows.map((row) => row.split(splitChar));
  }

  get data(): string[][] {
    return this._data;
  }

  get headlessData(): string[][] {
    const headlessData = this._data.slice(1);
    return headlessData;
  }

  get headers(): string[] {
    return this._data[0];
  }

  get metaData(): string[][] | undefined {
    return this._metaData;
  }

  getColumnByHeader(header: string): string[] {
    const index = this.headers.indexOf(header);

    if (index === -1) {
      throw new Error(`Header ${header} not found`);
    }

    return this._data.map((row) => row[index]);
  }

  getCellByRowAndHeader(row: number, header: string): string {
    const headerIndex = this.headers.indexOf(header);

    if (headerIndex === -1) {
      throw new Error(`Header ${header} not found`);
    }

    return this.headlessData[row][headerIndex];
  }

  getHeadersBySubstring(substring: string): string[] {
    return this.headers.filter((header) => header.includes(substring));
  }
}
