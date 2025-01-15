import { TemplateRef } from "@angular/core";

export type TableDefintion<T> = {
    headers: TableHeaderDefinition<T>[];
    body: T[];
    paginator: TablePaginator;
    actions: TableActionsDefinition | false;
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

export type TableActionsDefinition = {
    label: string;
    view: {
        active: boolean;
        render?: TemplateRef<any>
    } | false;
    update: {
        active: boolean;
        render?: TemplateRef<any>;
    } | false;
    delete: {
        active: boolean;
        render?: TemplateRef<any>
    } | false;
}