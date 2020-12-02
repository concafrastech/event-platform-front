import { Conference } from './conference';
import { Trail } from './trail';
import { User } from './user';

export class Subscription {
    constructor(
        public _id: string,
        public subscription_id: number,
        public user: User,
        public conference: Conference,
        public trails: Trail[],
    ) {}
}
