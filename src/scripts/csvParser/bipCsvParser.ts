import { RawData } from 'src/models/stackedBarChart';
const basePath = import.meta.env.BASE_URL;

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

export async function loadCSV(): Promise<RawData[]> {
  try {
    const response = await fetch(`${basePath}data/dataBip.csv`);

    if (!response.ok) {
      throw new Error('Failed to load CSV');
    }

    const csvText = await response.text();
    const csvParsed = parseCSV(csvText);
    const formattedData = formatCSV(csvParsed);
    return formattedData;
  } catch (error) {
    console.error('Error loading CSV:', error);
  }
  return [];
}

function parseCSV(csvText: string): string[][] {
  const rows = csvText.split('\n');
  const csvData = rows.map((row) => row.split(','));
  return csvData;
}

function formatCSV(csvParsed: string[][]): RawData[] {
  const formattedData = csvParsed.slice(1).map((row) => {
    return {
      group: Number(row[0]),
      series: Number(row[1]),
      value: Number(row[2]),
    };
  });

  const formattedFiltredData = formattedData.filter((d) => {
    return d.group && d.series && d.value;
  });

  return formattedFiltredData;
}
