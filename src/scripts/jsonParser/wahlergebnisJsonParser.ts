import {
  PartyResult,
  ElectionData,
  ElectionDistrictData,
  Raw,
} from 'src/models/wahlergebnis';
const basePath = import.meta.env.BASE_URL;

export async function loadWahlergebnisJSON(): Promise<ElectionData> {
  try {
    const response = await fetch(`${basePath}data/wahlergebnis.json`);
    if (!response.ok) {
      throw new Error(`Failed to load JSON: ${response.statusText}`);
    }
    const rawData: Raw[] = await response.json();

    const wahlergebnis = parseRawElectionData(rawData);

    return wahlergebnis;
  } catch (error) {
    throw error;
  }
}

function parseRawElectionData(rawData: Raw[]): ElectionData {
  const parteien = Object.keys(rawData[0]).filter(filterParteien);

  const wahlergebnis = {} as ElectionData;
  wahlergebnis.electionState = rawData[0]['Gebietsbezeichnung'] as string;
  wahlergebnis.date = rawData[0]['Letzte Änderung'] as string;
  wahlergebnis.electionDistrictResults = [];
  rawData.forEach((data) => {
    wahlergebnis.electionDistrictResults.push(buildWahlkreisErgebnis(data));
  });

  return wahlergebnis;

  function buildWahlkreisErgebnis(data: Raw): ElectionDistrictData {
    const wahlkreisErgebnis = {} as ElectionDistrictData;

    wahlkreisErgebnis.electionDistrict = {
      id: data['Gebietsschlüssel'] as string,
      name: data['Gebietsbezeichnung'] as string,
      voteLocation: data['Gebietstyp'] as string,
      electionDistrictMetaData: {
        eligble: data['Wahlberechtigte'] as number,
        votes: data['Wählerinnen und Wähler'] as number,
        nonValid: data['ungültige Wahlkreisstimmen'] as number,
        valid: data['gültige Wahlkreisstimmen'] as number,
        tournout: data['Wahlbeteiligung'] as number,
        winnerParty: data['Wahlkreis gewonnen: Wahlvorschlag'] as string,
      },
    };
    wahlkreisErgebnis.partyResults = [];

    parteien.forEach((partei) => {
      const parteiErgebnis = {} as PartyResult;
      const key = partei;
      const keyProzent = `${partei} (%)`;

      parteiErgebnis.party = partei.replace(' Wahlkreisstimmen', '');
      parteiErgebnis.votes = data[key] as number;
      parteiErgebnis.votesPercent = data[keyProzent] as number;
      wahlkreisErgebnis.partyResults.push(parteiErgebnis);
    });

    return wahlkreisErgebnis;
  }

  function filterParteien(partei: string): boolean {
    return (
      partei.includes('Wahlkreisstimmen') &&
      !partei.includes('(%)') &&
      !partei.includes('gültige')
    );
  }
}
