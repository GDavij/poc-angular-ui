export interface PaginatedList<T> {
    count: number;
    page: number;
    items: T[]
    hasNextPage: boolean;

    hasPreviousPage: boolean;
}

export interface ApiResult<T> {

    success: boolean;
    data: T;
    error: string;
}