import {
  Entity,
  Property,
  Collection,
  OneToMany,
} from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";
import { Luminaria } from "../luminaria/luminaria.entity.js";
import { EquipoAux } from "../equipoAuxiliar/equipoAuxiliar.entity.js";
import { Columna } from "../columna/columna.entity.js";
import { Mantenimiento } from "../mantenimiento/mantenimiento.entity.js";
import { Empleado } from "../empleado/empleado.entity.js";

@Entity()
export class ServicioLuz extends Base {
  @Property({ nullable: false })
  fechaInstalacion!: Date;

  @OneToMany(() => Luminaria, (luminaria) => luminaria.servicioLuz, {
    lazy: true,
  })
  luminarias = new Collection<Luminaria>(this);

  @OneToMany(() => EquipoAux, (equipoAux) => equipoAux.servicioLuz, {
    lazy: true,
  })
  equipoAuxiliar = new Collection<EquipoAux>(this);

  @OneToMany(() => Columna, (columna) => columna.servicioLuz, {
    lazy: true,
  })
  columna = new Collection<Columna>(this);

  @OneToMany(
    () => Mantenimiento,
    (mantenimiento) => mantenimiento.servicioLuz,
    { lazy: true }
  )
  mantenimientos = new Collection<Mantenimiento>(this);

  // @ManyToOne(() => Ubicacion, { nullable: false })         Luego veremos si usamos esto o implementamos una api de mapas
  // ubicacion!: Rel<Ubicacion>;
}
