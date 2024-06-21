
export type GetHomeWidgetsApiArg = void;

export type GetStudiesApiResponse = StudiesResponse;
export type GetStudiesApiArg = any;

export type StudiesResponse = {
	data: StudiesType[];
	current_page: number;
	from: number;
	last_page: number;
	per_page: number;
	success: boolean;
	to: number;
	total: number;
};

export type StudiesType = {
	AccessionNumber: string;
	Allergies: string;
	InstanceAvailability: string;
	IssuerOfPatientID: string;
	MedicalAlerts: string;
	Modality: string;
	NumberOfStudyRelatedInstances: string;
	OtherPatientIDs: string;
	PatientBirthDate: string;
	PatientID: string;
	PatientName: string;
	PatientSex: string;
	QueryRetrieveLevel: string;
	RequestedProcedureDescription: string;
	RetrieveAETitle: string;
	SeriesDate: string;
	SeriesNro: 1;
	SpecificCharacterSet: string;
	StudyDate: string;
	StudyDescription: string;
	StudyInstanceUID: string;
	StudyTime: string;
	sortStudyDate: string;
}
