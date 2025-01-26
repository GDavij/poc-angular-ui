export type BorrowRecord = {
    id?: number;
    bookId: number;
    memberId: number;
    borrowDate: Date;
    returnDate: Date;
}