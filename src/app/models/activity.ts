import { Content } from './content';
import { Stage } from './stage';

export class Activity {
    constructor(
        public _id: string,
        public activity_id: number,
        public name: string,
        public description: string,
        public type: string,
        public speecher: string,
        public start_time: Date,
        public end_time: Date,
        public scheduled: boolean,
        public stage: Stage,
        public contents: Content[],
        public created_at: Date,
        public updated_at: Date
    ) {}
}