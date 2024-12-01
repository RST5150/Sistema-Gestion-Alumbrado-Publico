import { Entity, Property, ManyToMany, Collection, OneToOne } from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";
import { Mantenimiento } from "../mantenimiento/mantenimiento.entity.js";
import { ServicioLuz } from "../servicioLuz/servicioLuz.entity.js";

@Entity()
export class Columna extends Base {
    @Property({nullable: false, unique: true})
    nroSerie!: String;    
    
    @Property({nullable: false})
    material!: String;

    @Property({nullable: false})
    fechaAdquisicion!: Date;

    @Property({nullable: true})
    fechaInstalacion!: Date;

    @OneToOne(() => ServicioLuz, { nullable: true }) 
    servicio!: ServicioLuz;

}

export enum Material {
    Acero = 'Acero',
    Madera = 'Madera',
    Hormigon = 'Hormigon',
}