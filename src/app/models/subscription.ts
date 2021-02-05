import { Conference } from './conference';
import { Trail } from './trail';
import { User } from './user';

export class Subscription {
    constructor(
        public _id: string,
        public subscription_id: number,
        public payment_status: string,
        public user: User,
        public conference: Conference,
        public trails: Trail[],
        public created_at: Date,
        public updated_at: Date
    ) {}
}
