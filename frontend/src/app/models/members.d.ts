export interface Member {
    id?: number;
    name: string;
    email: string;
    phone: string;
    borrowRecords: MemberBorrowBook[]
}

export type MemberBorrowBook = {
    borrowId: number;
    bookId: number;
    bookTitle: string;
    bookAuthor: string;
    genre: string;
    publishedYear: number;
    borrowAt: Date;
    returnAt: Date | null;
}