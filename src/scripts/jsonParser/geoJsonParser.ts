import type { FeatureCollection } from 'geojson';
const basePath = import.meta.env.BASE_URL;

export async function loadGeoJSON(): Promise<FeatureCollection> {
  try {
    const response = await fetch(`${basePath}data/wahlkreise.json`);
    if (!response.ok) {
      throw new Error(`Failed to load JSON: ${response.statusText}`);
    }
    const data: FeatureCollection = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading GeoJSON:', error);
    throw error;
  }
}
