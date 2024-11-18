import { RawData } from '../components/models';

export function parseCsvToGroupedBarChartData(csvContent: string): RawData[] {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map((header) => header.trim());

  // Validate headers
  const expectedHeaders = ['Jahr', 'Quartal', 'Bruttoinlandsprodukt'];
  if (!expectedHeaders.every((header) => headers.includes(header))) {
    throw new Error(
      'CSV headers do not match the expected format: year, quartal, BIP'
    );
  }

  const yearIndex = headers.indexOf('year');
  const quartalIndex = headers.indexOf('quartal');
  const bipIndex = headers.indexOf('BIP');

  return lines.slice(1).map((line) => {
    const values = line.split(',').map((value) => value.trim());
    return {
      group: parseInt(values[yearIndex], 10),
      series: parseInt(values[quartalIndex], 10),
      value: parseFloat(values[bipIndex]),
    } as RawData;
  });
}
