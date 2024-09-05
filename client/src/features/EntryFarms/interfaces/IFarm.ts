export default interface IFarm {
  readonly id: number;
  readonly doc: string;
  readonly nomeProdutor: string;
  readonly nomeFazenda: string;
  readonly estato: number;
  readonly cidade: number;
  readonly culturas: Array<String>[];
  readonly areaTotal: number;
  readonly areaAgro: number;
  readonly areaVeg: number;
}