import {
  Entity,
  Property,
  ManyToOne,
  Rel,
} from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";
import { ServicioLuz } from "../servicioLuz/servicioLuz.entity.js";
import { Mantenimiento } from "../mantenimiento/mantenimiento.entity.js";

@Entity()
export class Luminaria extends Base {
  @Property({ nullable: false, unique: true })
  nroSerie!: string;

  @Property({ nullable: false })
  marca!: string;

  @Property({ nullable: false })
  tecnologia!: string;

  @Property({ nullable: false })
  potencia!: number;

  @Property({ nullable: false })
  fechaAdquisicion!: Date;

  @Property({ nullable: true }) //Deberia actualizarse cuando una luminaria se instala en un servicio
  fechaInstalacion!: Date;

  @Property({ nullable: true })
  fechaRemocion!: Date;

  @ManyToOne(() => ServicioLuz, { nullable: true }) // error de dependencia circular
  servicioLuz!: Rel<ServicioLuz> | null;
}

export enum Tecnologia {
  LED = "LED",
  Mercurio = "Mercurio",
  Sodio = "Sodio",
}
