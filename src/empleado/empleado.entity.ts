import { Entity, Property, OneToMany, Collection } from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";
import { Mantenimiento } from "../mantenimiento/mantenimiento.entity.js";

@Entity()
export class Empleado extends Base {
    @Property({nullable: false})
    dni!: string;

    @Property({nullable: false})
    apellido!: string;

    @Property({nullable: false})
    nombre!: string;

    @Property({nullable: true})
    email!: string;

    @Property({nullable: true})
    telefono!: string;

    @Property({nullable: false})
    fechaIngreso!: Date;

    @OneToMany('mantenimiento', 'empleado')
    mantenimientos = new Collection<Mantenimiento>(this);
}


