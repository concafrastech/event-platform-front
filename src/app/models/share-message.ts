import { User } from "./user";

export class ShareMessage{

    constructor(
        public _id: string,
        public message: string,
        public user: User,
        public created_at: Date
    ) {}
}