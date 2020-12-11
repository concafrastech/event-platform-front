import { Activity } from './activity';
import { Epic } from './epic';

export class Stage {
    constructor(
        public _id: string,
        public stage_id: number,
        public name: string,
        public description: string,
        public type: string,
        public epic: Epic,
        public activities: Activity[],
        public created_at: Date,
        public updated_at: Date
    ) {}
}
