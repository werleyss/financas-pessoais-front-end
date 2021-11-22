export class RetornoApiViewModel<T>{ 
    data: T;
    links: Links;
    meta: Meta;
}

export class Links {
    constructor(
        first:  string,
        last:   string,
        next:   string,
        prev:   string
    ) {}
}

export class Meta {
    constructor(
        public current_page: number,
        public from: number,
        public last_page: number,
        public links: Array<any>,
        public path: string,
        public per_page: number,
        public to: number,
        public total: number,
    ) { }
    
}