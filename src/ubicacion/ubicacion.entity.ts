import { Entity, Property, ManyToMany, Collection } from "@mikro-orm/core";
import { Base } from "../shared/db/base.entity.js";

@Entity()
export class Ubicacion extends Base {
    @Property({nullable: false, unique: true})
    calle!: string;    
    
    @Property({nullable: false})
    altura!: string;

    @Property({nullable: true})
    bis!: boolean;

    @Property({nullable: false})
    latitud!: number;

    @Property({nullable: false})
    longitud!: number;

    @Property({nullable: false})
    distrito!: string;              //capaz podriamos implementar coordenadas con la API de maps, capaz no es taaaan dificil
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