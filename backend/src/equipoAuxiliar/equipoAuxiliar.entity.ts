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
export class EquipoAux extends Base {
  @Property({ nullable: false, unique: true })
  nroSerie!: string;

  @Property({ nullable: false })
  marca!: string;

  @Property({ nullable: false })
  tipo!: string;

  @Property({ nullable: false })
  fechaAdquisicion!: Date;

  @Property({ nullable: true }) //Deberia actualizarse cuando un equipo auxiliar se instala en un servicio
  fechaInstalacion!: Date;

  @Property({ nullable: true })
  fechaRemocion!: Date;

  @ManyToOne(() => ServicioLuz, { nullable: true })
  servicioLuz!: Rel<ServicioLuz> | null;
}

export enum Tipo {
  Driver = "Driver",
  Balastro = "Balastro",
}
