import { Entity, Property, ManyToMany, Collection } from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";

@Entity()
export class ubicacion extends Base {
    @Property({nullable: false, unique: true})
    calle!: String;    
    
    @Property({nullable: false})
    altura!: Number;

    @Property({nullable: false})
    bis!: Boolean;

    @Property({nullable: false})
    distrito!: String;              //capaz podriamos implementar coordenadas con la API de maps, capaz no es taaaan dificil
                                    // o con la API de la muni, creo que está disponible
}

export enum Distrito {
    Norte = 'Norte',
    Sur = 'Sur',
    Oeste = 'Oeste',
    Noroeste = 'Noroeste',
    Sudoeste = 'Sudoeste',
    Centro = 'Centro',
}