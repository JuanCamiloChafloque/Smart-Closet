export class Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public genero: string,
    public correo: string,
    public nickname: string,
    public password: string,
    public ciudad: string,
    public celular: string
  ) {}
}
