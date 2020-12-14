import { Classroom } from './classroom';
import { Epic } from './epic';

export class Trail {
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public type: string,
        public subject: string,
        public epic: Epic,
        public classrooms: Classroom[],
        public created_at: Date,
        public updated_at: Date
    ) {}
}
