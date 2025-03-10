import { Entity, Property, ManyToMany, Collection, ManyToOne, Rel } from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";
import { ServicioLuz } from "../servicioLuz/servicioLuz.entity.js";
import { Mantenimiento } from "../mantenimiento/mantenimiento.entity.js";

@Entity()
export class Luminaria extends Base {
    @Property({nullable: false, unique: true})
    nroSerie!: string;    

    @Property({nullable: false})
    marca!: string;

    @Property({nullable: false})
    tecnologia!: string;

    @Property({nullable: false})
    potencia!: number;

    @Property({nullable: false})
    fechaAdquisicion!: Date;

    @Property({nullable: true})
    fechaInstalacion!: Date;

    @ManyToOne(() => ServicioLuz, {nullable: true}) // error de dependencia circular
    serviciosLuz!: Rel<ServicioLuz>;

    @ManyToOne(() => Mantenimiento, { nullable: true })
    mantenimiento!: Rel<Mantenimiento>;

}

export enum Tecnologia {
    LED = 'LED',
    Mercurio = 'Mercurio',
    Sodio = 'Sodio',
}