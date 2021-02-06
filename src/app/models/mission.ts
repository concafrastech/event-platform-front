import { Epic } from './epic';

export class Mission {
    constructor(
        public _id: string,
        public mission_id: number,
        public epic: Epic,
        public name: string,
        public description: string,
        public amount: number,
        public limit: number,
        public created_at: Date,
        public updated_at: Date
    ) {}
}
