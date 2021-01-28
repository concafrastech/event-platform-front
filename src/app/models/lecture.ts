import { Content } from './content';
import { Epic } from './epic';
import { Document } from './document';

export class Lecture {
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public type: string,
        public speecher: string,
        public start_time: Date,
        public end_time: Date,
        public epic: Epic,
        public contents: Content[],
        public created_at: Date,
        public updated_at: Date,
        public thumbnail: Document
    ) {}
}