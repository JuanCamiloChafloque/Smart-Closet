export class Prenda {
  constructor(
    public id: number,
    public seccion: string,
    public tipo: string,
    public formalidad: number,
    public abrigo: number,
    public color: string,
    public favorito: boolean,
    public disponible: boolean,
    public descripcion: string,
    public url: string,
    public cuello?: string,
    public manga?: string,
    public bota?: string,
    public forma?: string,
    public largo?: string,
    public lugar?: string,
    public selected?: boolean
  ) {}
}
