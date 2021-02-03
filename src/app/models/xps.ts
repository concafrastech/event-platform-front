import { Mission } from "./mission";
import { User } from "./user";

export class Xps {
  constructor(public _id: string, public user: User, public mission: Mission) {}
}
