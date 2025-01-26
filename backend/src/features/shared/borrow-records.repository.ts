import db from "../../drivers/sqlite";

export class BorrowRecordsRepository {
    
    
    public isBookInUse(bookId: number): boolean {
        return !!db.prepare<number, number>(`SELECT 1 
                                             FROM borrowRecords
                                             WHERE id = ? 
                                             AND returnDate IS NULL`).get(bookId);
    }

    public borrowBookFor(bookId: number, memberId: number): boolean {
        try {
            db.prepare(
                "INSERT INTO borrowRecords (bookId, memberId, borrowDate, returnDate) VALUES (?, ?, ?, NULL)"
            ).run(bookId, memberId, new Date().toISOString());

            return true;
        } catch (err) {
            return false;
        }
    }

    public exists(id: number): boolean {
        return !!db.prepare<number, number>(`SELECT 1 
                                             FROM borrowRecords
                                             WHERE id = ?`).get(id);
    }

    public returnBookForRecord(recordId: number): boolean {
        try {
            db.prepare(`UPDATE borrowRecords
                        SET returnDate = ? 
                        WHERE id = ?`
            ).run(new Date().toISOString(), recordId);

            return true;
        } catch(err) {
            return false;
        }
    }
}
