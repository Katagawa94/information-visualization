const basePath = import.meta.env.BASE_URL;
import {
  PartyResult,
  ElectionData,
  ElectionDistrict,
  ElectionDistrictData,
  ElectionMetaData,
} from 'src/models/wahlergebnis';
import CsvContent from 'src/models/csvContent';

export async function loadWahlergebnisse(): Promise<ElectionData> {
  try {
    const response = await fetch(`${basePath}data/wahlergebnis.csv`);

    if (!response.ok) {
      throw new Error('Failed to load CSV');
    }

    const csvText = await response.text();
    const csvContent = new CsvContent(csvText, ';', 1);
    const wahlergebnis = parseCsvContentToWahlergebnis(csvContent);
    return wahlergebnis;
  } catch (error) {
    console.error('Error loading CSV:', error);
  }
  return {} as ElectionData;
}

function parseCsvContentToWahlergebnis(csvContent: CsvContent): ElectionData {
  const wahlergebnis = {} as ElectionData;
  wahlergebnis.electionState = 'Hessen';
  wahlergebnis.date = csvContent.metaData![0][1].replace('Wahldatum: ', '');
  wahlergebnis.electionDistrictResults = [];

  const parteien = getParteienFromHeaders(csvContent);

  csvContent.headlessData.forEach((_, i) => {
    wahlergebnis.electionDistrictResults.push(
      buildWahlkreisergebnis(parteien, i, csvContent)
    );
  });

  return wahlergebnis;
}

function getParteienFromHeaders(csvContent: CsvContent): string[] {
  const unfilteredHeaders =
    csvContent.getHeadersBySubstring('Wahlkreisstimmen');
  const filteredHeaders = unfilteredHeaders.filter(
    (header) => !header.includes('%')
  );

  filteredHeaders.splice(0, 2); // remove "ungültige" and "gültige"
  const parteien = filteredHeaders.map((header) =>
    header.replace(' Wahlkreisstimmen', '')
  );
  return parteien;
}

function buildWahlkreisergebnis(
  parteien: string[],
  rowIndex: number,
  csvContent: CsvContent
): ElectionDistrictData {
  const wahlkreisErgebnis = {} as ElectionDistrictData;
  wahlkreisErgebnis.electionDistrict = buildWahlkreis(rowIndex, csvContent);
  wahlkreisErgebnis.partyResults = buildParteiErgebnisse(
    parteien,
    rowIndex,
    csvContent
  );
  return wahlkreisErgebnis;
}

function buildWahlkreis(
  rowIndex: number,
  csvContent: CsvContent
): ElectionDistrict {
  const wahlkreis = {} as ElectionDistrict;
  wahlkreis.name = csvContent.getCellByRowAndHeader(
    rowIndex,
    'Gebietsbezeichnung'
  );
  wahlkreis.id = csvContent.getCellByRowAndHeader(rowIndex, 'Gebietsschlüssel');
  wahlkreis.voteLocation = csvContent.getCellByRowAndHeader(
    rowIndex,
    'Wahllokal'
  );
  wahlkreis.electionDistrictMetaData = buildWahlkreisMetaDaten(
    rowIndex,
    csvContent
  );

  return wahlkreis;
}

function buildParteiErgebnisse(
  parteien: string[],
  rowIndex: number,
  csvContent: CsvContent
): PartyResult[] {
  const parteiErgebnisse = [] as PartyResult[];

  parteien.forEach((partei) => {
    const parteiErgebnis = {} as PartyResult;
    parteiErgebnis.party = partei;
    parteiErgebnis.votes = parseInt(
      csvContent.getCellByRowAndHeader(rowIndex, `${partei} Wahlkreisstimmen`)
    );
    parteiErgebnis.votesPercent = parseFloat(
      csvContent.getCellByRowAndHeader(
        rowIndex,
        `${partei} Wahlkreisstimmen (%)`
      )
    );
    parteiErgebnisse.push(parteiErgebnis);
  });

  return parteiErgebnisse;
}

function buildWahlkreisMetaDaten(
  rowIndex: number,
  csvContent: CsvContent
): ElectionMetaData {
  const wahlkreisMetaDaten = {} as ElectionMetaData;

  wahlkreisMetaDaten.eligble = parseInt(
    csvContent.getCellByRowAndHeader(rowIndex, 'Wahlberechtigte')
  );
  wahlkreisMetaDaten.winnerParty = csvContent.getCellByRowAndHeader(
    rowIndex,
    'Wahlkreis gewonnen: Wahlvorschlag'
  );
  wahlkreisMetaDaten.votes = parseInt(
    csvContent.getCellByRowAndHeader(rowIndex, 'Wählerinnen und Wähler')
  );
  wahlkreisMetaDaten.nonValid = parseInt(
    csvContent.getCellByRowAndHeader(rowIndex, 'ungültige Wahlkreisstimmen')
  );
  wahlkreisMetaDaten.valid = parseInt(
    csvContent.getCellByRowAndHeader(rowIndex, 'gültige Wahlkreisstimmen')
  );
  wahlkreisMetaDaten.tournout = parseInt(
    csvContent.getCellByRowAndHeader(rowIndex, 'Wahlbeteiligung')
  );
  wahlkreisMetaDaten.eligble = parseInt(
    csvContent.getCellByRowAndHeader(rowIndex, 'Wahlberechtigte')
  );

  return wahlkreisMetaDaten;
}
