import { Subscription } from './subscription';

export class User {
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public fullname: string,
        public nick: string,
        public birthday: Date,
        public email: string,
        public whatsapp: string,
        public password: string,
        public country: string,
        public state: string,
        public city: string,
        public leader: boolean,
        public company: string,
        public role: string,
        public image: string,
        public points: number,
        public firstlogin: boolean,
        public subscriptions: Subscription[],
        public level: {}
    ) {}
}

