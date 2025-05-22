import {
  Entity,
  Property,
  Rel,
  ManyToOne,
} from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";
import { ServicioLuz } from "../servicioLuz/servicioLuz.entity.js";

@Entity()
export class Columna extends Base {
  @Property({ nullable: false, unique: true })
  nroSerie!: string;

  @Property({ nullable: false })
  material!: string;

  @Property({ nullable: false })
  fechaAdquisicion!: Date;

  @Property({ nullable: true }) //Deberia actualizarse cuando una columna se instala en un servicio
  fechaInstalacion!: Date;

  @Property({ nullable: true })
  fechaRemocion!: Date;

  @ManyToOne(() => ServicioLuz, { nullable: true })
  servicioLuz!: Rel<ServicioLuz> | null;
}

export enum Material {
  Acero = "Acero",
  Madera = "Madera",
  Hormigon = "Hormigon",
}
