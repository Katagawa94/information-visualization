// studentsData.ts

type Observation = [number, number, number, number, number, number | null];

interface Sender {
  id: string;
  name: string;
}

interface Header {
  id: string;
  prepared: string;
  test: boolean;
  sender: Sender;
}

interface DimensionValue {
  id: string;
  name: string;
}

interface Dimension {
  id: string;
  name: string;
  keyPosition: number;
  role: string;
  values: DimensionValue[];
}

interface Observations {
  [key: string]: Observation;
}

interface SeriesData {
  attributes: unknown[];
  annotations: unknown[];
  observations: Observations;
}

interface DataSet {
  action: string;
  series: { [key: string]: SeriesData };
}

interface Structure {
  name: string;
  description: string;
  dimensions: {
    dataset: Dimension[];
    series: Dimension[];
    observation: Dimension[];
  };
  attributes: unknown;
  annotations: unknown[];
}

interface sdmxData {
  header: Header;
  dataSets: DataSet[];
  structure: Structure;
}

export class SdmxParser {
  private data: sdmxData;

  constructor(jsonData: string) {
    this.data = JSON.parse(jsonData);
  }

  getHeader(): Header {
    return this.data.header;
  }

  getDataSets(): DataSet[] {
    return this.data.dataSets;
  }

  getStructure(): Structure {
    return this.data.structure;
  }

  getObservationsBySeries(seriesId: string): Observation[] | undefined {
    const series = this.data.dataSets[0].series[seriesId];
    return series ? Object.values(series.observations) : undefined;
  }

  getObservationsByRefArea(
    countryCode: string
  ): { [year: string]: Observation } | undefined {
    const countrySeriesId = this.getSeriesIdByRefArea(countryCode);
    return countrySeriesId
      ? this.data.dataSets[0].series[countrySeriesId].observations
      : undefined;
  }

  private getSeriesIdByRefArea(countryCode: string): string | undefined {
    const countryDimension = this.data.structure.dimensions.series.find(
      (d) => d.id === 'REF_AREA'
    );
    if (!countryDimension) return undefined;
    const country = countryDimension.values.find(
      (value) => value.id === countryCode
    );
    return country
      ? `0:0:0:0:0:0:${countryDimension.values.indexOf(country)}:0`
      : undefined;
  }

  getRefAreas(): DimensionValue[] {
    const refAreaDimension = this.data.structure.dimensions.series.find(
      (d) => d.id === 'REF_AREA'
    );
    return refAreaDimension ? refAreaDimension.values : [];
  }

  getTimePeriods(): DimensionValue[] {
    const timePeriodDimension = this.data.structure.dimensions.observation.find(
      (d) => d.id === 'TIME_PERIOD'
    );
    return timePeriodDimension ? timePeriodDimension.values : [];
  }

  getObservationsByYear(
    year: string
  ): { [seriesId: string]: Observation } | undefined {
    const timePeriodDimension = this.getTimePeriods();
    const yearIndex = timePeriodDimension?.findIndex(
      (value) => value.id === year
    );
    if (yearIndex === undefined || yearIndex === -1) return undefined;

    const observations: { [seriesId: string]: Observation } = {};

    Object.entries(this.getDataSets()[0].series).forEach(
      ([seriesId, seriesData]) => {
        const observation = seriesData.observations[yearIndex.toString()];
        if (observation !== undefined) {
          observations[seriesId] = observation;
        }
      }
    );

    return Object.keys(observations).length > 0 ? observations : undefined;
  }
}
