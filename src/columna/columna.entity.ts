import { Entity, Property, ManyToMany, Collection } from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";

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

}

export enum Material {
    Acero = 'Acero',
    Madera = 'Madera',
    Hormigon = 'Hormigon',
}