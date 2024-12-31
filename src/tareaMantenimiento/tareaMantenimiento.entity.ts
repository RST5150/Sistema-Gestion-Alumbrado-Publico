import { Entity, Property, ManyToMany, Collection, ManyToOne, Rel } from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";
import { Mantenimiento } from "../mantenimiento/mantenimiento.entity.js";

@Entity()
export class Tarea extends Base {
    @Property({nullable: false, unique: true})
    nombre!: String;    
    
    @Property({nullable: false})
    nivel!: Number;

    @Property({nullable: false, type: 'integer'})
    frecuenciaMantenimiento!: Number;

    @ManyToOne(() => Mantenimiento, { nullable: true })
    mantenimiento!: Rel<Mantenimiento>;
}
