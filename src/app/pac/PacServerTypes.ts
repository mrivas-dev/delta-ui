export type GetPacServerApiResponse = SelPacsResponse;
export type GetPacServerApiArg = void;

export type PacServerType = {
	id: number;
	addinforme: boolean;
	agregaStu: string;
	assignWL: string;
	codigo: string;
	downCD: boolean;
	fecha_fija: string;
	marcaStudy: boolean;
	modalidad_fija: any[];
	nombre: string;
	noupload: boolean;
	observaciones: number;
	origenWlscu: string;
	otroVisor: any[];
	pedidomedico: boolean;
	shareWhat: boolean;
	teclaInfo: boolean;
	tipo: string;
	uriAlt: string;
	uriVisor: string;
	usertf: boolean;
}

export type SelPacsResponse = {
	pacs: PacServerType[];
	success: boolean;
	usuariosGoogle: any[];
};
