type HomeOverviewData = {
	[key: string]: number;
};

type HomeSeriesData = {
	name: string;
	type: string;
	data: number[];
};

/**
 * The type definition for the data used to populate the github issues chart.
 */
type HomeDataType = {
	overview: Record<string, HomeOverviewData>;
	ranges: Record<string, string>;
	labels: string[];
	series: Record<string, HomeSeriesData[]>;
};

export default HomeDataType;
