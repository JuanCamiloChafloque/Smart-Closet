export class Prenda {
  constructor(
    public id: number,
    public seccion: string,
    public tipo: string,
    public nivelFormalidad: number,
    public nivelAbrigo: number,
    public color: string,
    public favorito: boolean,
    public disponible: boolean,
    public descripcion: string,
    public imgUrl: string
  ) {}
}
