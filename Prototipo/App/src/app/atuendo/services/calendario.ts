import { Atuendo } from './atuendo';
export class Calendario {
  constructor(
    public dia: number,
    public mes: number,
    public anio: number,
    public atuendo: Atuendo
  ) {}
}
