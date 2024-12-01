import { Entity, Property, ManyToMany, Collection, OneToMany } from "@mikro-orm/core";
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

    @ManyToMany(() => ServicioLuz, (servicioLuz) => servicioLuz.equiposAux)
    serviciosLuz = new Collection<ServicioLuz>(this);

    @OneToMany('mantenimiento', 'equipoAux')
    mantenimientos = new Collection<Mantenimiento>(this);

}

export enum Tipo {
    Driver = 'Driver',
    Balastro = 'Balastro',
}