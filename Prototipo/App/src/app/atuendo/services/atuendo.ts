import { Prenda } from '../../prenda/services/prenda';
export class Atuendo {
  constructor(
    public id: number,
    public favorito: boolean,
    public prendas: Prenda[],
    public numSup?: number,
    public numAcc?: number,
    public numVes?: number,
    public ultimo?: Date,
    public cantidad?: number
  ) {}
}
