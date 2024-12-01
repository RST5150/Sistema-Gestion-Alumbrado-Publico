import { Entity, Property, ManyToMany, Collection, Cascade, OneToMany, OneToOne, Rel } from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";
import { Luminaria } from "../luminaria/luminaria.entity.js";
import { EquipoAux } from "../equipoAuxiliar/equipoAuxiliar.entity.js";
import { Columna } from "../columna/columna.entity.js";
import { Mantenimiento } from "../mantenimiento/mantenimiento.entity.js";


@Entity()
export class ServicioLuz extends Base {
    @Property({nullable: false})
    fechaInstalacion!: Date;

    @ManyToMany(() => Luminaria, (luminaria) => luminaria.serviciosLuz, {
        cascade: [Cascade.ALL],
        owner: true
    })
    luminarias = new Collection<Luminaria>(this);

    @ManyToMany(() => EquipoAux, (equipoAux) => equipoAux.serviciosLuz, {
        cascade: [Cascade.ALL],
        owner: true
    })
    equiposAux = new Collection<EquipoAux>(this); 
    // Hay que ver si las relaciones son las correctas, pareciera que no

    @OneToOne(() => Columna, (columna) => columna.servicio, {
        cascade: [Cascade.ALL],
        owner: true,
        nullable: true,
    })
    columna!: Rel<Columna>;

    @OneToMany(() => Mantenimiento, (mantenimiento) => mantenimiento.servicio, {
        cascade: [Cascade.ALL],
    })
    mantenimientos = new Collection<Mantenimiento>(this);


}