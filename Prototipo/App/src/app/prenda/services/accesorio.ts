export class Accesorio {
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
    public lugar: string
  ) {}
}
