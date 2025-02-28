import { Entity, Property, ManyToMany, Collection, OneToMany, ManyToOne, Rel } from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";
import { ServicioLuz } from "../servicioLuz/servicioLuz.entity.js";
import { Mantenimiento } from "../mantenimiento/mantenimiento.entity.js";

@Entity()
export class EquipoAux extends Base {
    @Property({nullable: false, unique: true})
    nroSerie!: String;    
    
    @Property({nullable: false})
    marca!: String;

    @Property({nullable: false})
    tipo!: String;

    @Property({nullable: false})
    fechaAdquisicion!: Date;

    @Property({nullable: true})
    fechaInstalacion!: Date;

    @ManyToOne(() => ServicioLuz, {nullable: true})
    serviciosLuz!: ServicioLuz;

    @ManyToOne(() => Mantenimiento, { nullable: true })
    mantenimiento!: Mantenimiento;

}

export enum Tipo {
    Driver = 'Driver',
    Balastro = 'Balastro',
}