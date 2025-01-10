export class PaginatedList<T> {
    public count: number;
    public page: number;
    public items: T[]


    public hasNextPage: boolean;

    public hasPreviousPage: boolean;

    public constructor(count: number, items: T[], page: number) {
        this.count = count;
        this.items = items;
        this.page = page;
        this.hasNextPage = this.page * this.items.length < this.count;
        this.hasPreviousPage = this.page > 1;
    }

    public static forArray<T>(items: T[], count: number, page: number) {
        return new PaginatedList<T>(count, items, page);
    }

    public static get empty() {
        return new PaginatedList<never>(0, [], 1);
    }
}