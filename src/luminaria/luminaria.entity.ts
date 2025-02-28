import { Entity, Property, ManyToMany, Collection, ManyToOne, Rel } from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";
import { ServicioLuz } from "../servicioLuz/servicioLuz.entity.js";
import { Mantenimiento } from "../mantenimiento/mantenimiento.entity.js";

@Entity()
export class Luminaria extends Base {
    @Property({nullable: false, unique: true})
    nroSerie!: String;    

    @Property({nullable: false})
    marca!: String;

    @Property({nullable: false})
    tecnologia!: String;

    @Property({nullable: false})
    potencia!: Number;

    @Property({nullable: false})
    fechaAdquisicion!: Date;

    @Property({nullable: true})
    fechaInstalacion!: Date;

    @ManyToOne(() => ServicioLuz, {nullable: true})
    serviciosLuz!: ServicioLuz;

    @ManyToOne(() => Mantenimiento, { nullable: true })
    mantenimiento!: Rel<Mantenimiento>;

}

export enum Tecnologia {
    LED = 'LED',
    Mercurio = 'Mercurio',
    Sodio = 'Sodio',
}