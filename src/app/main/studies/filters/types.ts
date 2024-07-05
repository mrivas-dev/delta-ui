
export interface StudiesInnerFilter {
    datosEst: string,
    fecha: string,
    hasta: string,
    hastaVisible: boolean,
    paciente: string,
    servidor: number
    tipoBusqueda: string,
    ifapproved: boolean,
    ifsigned: boolean,
    tipoEst: string[],
}

export interface StudiesFiltersType {
    columna: string,
    cuantos: number,
    direccion: string,
    pag: number,
    texto: StudiesInnerFilter
};