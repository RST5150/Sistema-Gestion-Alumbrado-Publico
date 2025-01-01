import { Entity, Property, OneToMany, Collection, Cascade } from "@mikro-orm/core";
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

    @Property({nullable: false})
    rol!: string;

    @OneToMany(() => Mantenimiento, (mantenimiento) => mantenimiento.empleado, {
    cascade: [Cascade.ALL],
})
    mantenimientos = new Collection<Mantenimiento>(this);
}

export enum Rol {
    Director = 'Director',
    Administrativo = 'Administrativo',
    Empleado = 'Empleado',
}

