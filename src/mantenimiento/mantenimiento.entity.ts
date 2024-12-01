import { Entity, Property, ManyToMany, Collection, Cascade, OneToMany, ManyToOne, Rel } from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";
import { ServicioLuz } from "../servicioLuz/servicioLuz.entity.js";
import { Tarea } from "../tareaMantenimiento/tareaMantenimiento.entity.js";
import { Empleado } from "../empleado/empleado.entity.js";
import { Luminaria } from "../luminaria/luminaria.entity.js";
import { EquipoAux } from "../equipoAuxiliar/equipoAuxiliar.entity.js";

@Entity()
export class Mantenimiento extends Base {
    @Property({nullable: false})
    fechaAlta!: Date;

    @Property({nullable: false})
    estado!: String;

    @Property({nullable: false})
    tipo!: String;

    @Property({nullable: true})
    fechaRealizacion!: Date;

    @Property({nullable: false, type: 'float'})
    valorPAT!: Number;

    @Property({nullable: true})
    falla!: String;

    @ManyToOne(() => ServicioLuz, { nullable: true })
    servicio!: Rel<ServicioLuz>;  // El Rel<> soluciona el problema de dependecia circular, eso dice la documentacion de mikroOrm

    @OneToMany(() => Tarea, (tarea) => tarea.mantenimiento, {
        cascade: [Cascade.ALL],
    })
    tareas = new Collection<Tarea>(this);

    @ManyToOne(() => Empleado, { nullable: true })
    empleado!: Rel<Empleado>;

    @OneToMany(() => Luminaria, (luminaria) => luminaria.mantenimiento, {
        cascade: [Cascade.ALL],
    })
    luminarias = new Collection<Luminaria>(this);

    @OneToMany(() => EquipoAux, (equipoAux) => equipoAux.mantenimiento, {
        cascade: [Cascade.ALL],
    })
    equiposAux = new Collection<EquipoAux>(this);
}

export enum Estado {
    Pendiente = 'Pendiente',
    Realizado = 'Realizado',
}

export enum Tipo {
    Rutinario = 'Rutinario',
    Prioritario = 'Prioritario',
}

export enum Falla {
    Luminaria = 'Luminaria',
    EquipoAuxiliar = 'Equipo Auxiliar',
    Ambos = 'Ambos',
}
