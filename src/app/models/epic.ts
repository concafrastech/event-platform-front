import { Conference } from './conference';

export class Epic {
    constructor(
        public _id: string,
        public name: string,
        public start_age: string,
        public end_age: string,
        public conference: Conference,
        public created_at: string
    ) {}
}
