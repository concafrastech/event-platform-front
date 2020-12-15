export class Schedule {
    constructor(
        public _id: string,
        public type: number,
        public name: string,
        public description: string,
        public start_time: Date,
        public end_time: Date
    ) {}
}
