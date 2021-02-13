export class Schedule {
    constructor(
        public id: string,
        public type: string,
        public name: string,
        public description: string,
        public start_time: Date,
        public end_time: Date
    ) {}
}
