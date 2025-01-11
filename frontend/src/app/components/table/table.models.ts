export type TableDefintion<T> = {
    headers: TableHeaderDefinition<T>[];
    body: T[];
    paginator: TablePaginator;
}

export type TableHeaderDefinition<T> = {
    property: keyof T;
    label: string;
}

export type TablePaginator = {
    page: number;
    pageSize: number;
    totalItems: number;
    pageSizeOptions: number[];
}