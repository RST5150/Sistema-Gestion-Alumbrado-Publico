import { Entity, Property, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";
import { Mantenimiento } from "../mantenimiento/mantenimiento.entity.js";
import { ServicioLuz } from "../servicioLuz/servicioLuz.entity.js";

@Entity()
export class Empleado extends Base {
    @Property({nullable: false})
    dni!: string;

    @Property({nullable: false})
    apellido!: string;

    @Property({nullable: false})
    nombre!: string;

    @Property({nullable: false})
    email!: string;

    @Property({nullable: true})
    telefono!: string;

    @Property({nullable: false})
    fechaIngreso!: Date;

    @Property({nullable: false})
    rol!: string;

    @OneToMany(() => Mantenimiento, (mantenimiento) => mantenimiento.empleado, {lazy: true})
    mantenimientos = new Collection<Mantenimiento>(this);

 //   @OneToMany(() => ServicioLuz, servicioLuz => servicioLuz.empleado, {lazy: true})
 //   serviciosLuz = new Collection<ServicioLuz>(this);


}

export enum Rol {
    Director = 'Director',
    Administrativo = 'Administrativo',
    Empleado = 'Empleado',
}

