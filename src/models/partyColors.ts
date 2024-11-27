export const parties = [
  'CDU',
  'SPD',
  'GRÜNE',
  'AfD',
  'DIE LINKE',
  'FDP',
  'Others',
];

export const partyColors: { [key: string]: string } = {
  CDU: '#000000',
  SPD: '#E3000F',
  GRÜNE: '#1AA037',
  AfD: '#0489DB',
  'DIE LINKE': '#E3000F',
  FDP: '#FFEF00',
  Others: '#999999',
};

export function getColorForParty(partei: string): string {
  return partyColors[partei] || partyColors.Others;
}
