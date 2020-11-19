export class Conference {
    constructor(
        public _id: string,
        public name: string,
        public start_date: Date,
        public end_date: Date,
        public welcome_page: boolean,
        public welcome_page_content: string, 
        public tutorial_page: boolean,
        public tutorial_page_content: string, 
        public epics_enabled: boolean,
        public courses_enabled: boolean,
        public lectures_enabled: boolean,
        public trails_enabled: boolean,
        public created_at: Date,
        public updated_at: Date,
    ) {}
}
