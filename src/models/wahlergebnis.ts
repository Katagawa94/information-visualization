export interface PartyResult {
  party: string;
  votes: number;
  votesPercent: number;
}

export interface ElectionDistrict {
  name: string;
  id: string;
  voteLocation: string;
  electionDistrictMetaData: ElectionMetaData;
}

export interface ElectionMetaData {
  eligble: number;
  votes: number;
  nonValid: number;
  valid: number;
  tournout: number;
  winnerParty: string;
}

export interface ElectionDistrictData {
  electionDistrict: ElectionDistrict;
  partyResults: PartyResult[];
}

export interface ElectionData {
  electionState: string;
  date: string | undefined;
  electionMetaDaten: ElectionMetaData;
  electionDistrictResults: ElectionDistrictData[];
}

export interface Raw {
  [key: string]: unknown;
}

export function getWinnerPartyByElectionDistrictName(
  name: string,
  electionData: ElectionData
): string {
  const electionDistrict = electionData.electionDistrictResults.find(
    (district) => district.electionDistrict.name === name
  );

  const winnerParty =
    electionDistrict?.electionDistrict.electionDistrictMetaData.winnerParty;

  return winnerParty || '';
}
