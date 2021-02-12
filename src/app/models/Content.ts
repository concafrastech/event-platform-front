import { Document } from './document';

export class Content {
  constructor(
    public _id,
    public type: string,
    public sequence: number,
    public name: string,
    public replay: boolean,
    public autoplay: boolean,
    public controls: boolean,
    public url: string,
    public file: Document,
    public fileToUpload: File,
    public text: string,
    public zoom_api_key: string,
    public zoom_api_secret: string,
    public zoom_room: string,
    public zoom_password: string,
    public zoom_url: string,
    public use_alternative: boolean,
    public url_alternative: string,
    public active_alternative: boolean,
    public created_at: string,
    public updated_at: string,
    public time: number,
  ) {}
}
