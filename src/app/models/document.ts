
export class Document {
    constructor(
        public _id: string,
        public document_id: number,
        public description: string,
        public type: string,
        public size: number,
        public file_link: string,
        public s3_key: string,
        public created_at: Date,
        public updated_at: Date,
      ) {}
}
