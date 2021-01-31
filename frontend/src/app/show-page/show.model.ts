export class Show {
    constructor(
        public show_id: number, 
        public content_type: string,
        public title: string,
        public director: string,
        public cast: string,
        public country: string,
        public date_added: string,
        public release_year: number,
        public rating: string,
        public duration: string,
        public listed_in: string,
        public description: string,
    ) { }
  }