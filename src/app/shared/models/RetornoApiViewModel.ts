export interface RetornoApiViewModel<T>{ 
    data: T,
    path?: string;
    per_page?: number;
    to?: number
    total?: number
}