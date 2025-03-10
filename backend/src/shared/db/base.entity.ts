import { PrimaryKey } from "@mikro-orm/core";

export abstract class Base {
  @PrimaryKey()
  id?: number
}