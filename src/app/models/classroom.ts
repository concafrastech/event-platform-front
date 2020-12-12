import { Content } from './content';
import { Trail } from './trail';

export class Classroom {
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public type: string,
        public start_time: Date,
        public end_time: Date,
        public speecher: string,
        public trail: Trail,
        public tags: string[],
        public contents: Content[],
        public created_at: Date,
        public updated_at: Date,
        
    ) {}
}