-- Books Table
CREATE TABLE Books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT NOT NULL,
    publishedYear INT NOT NULL
);

-- Members Table
CREATE TABLE Members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL
);

-- Borrow Records Table
CREATE TABLE BorrowRecords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookId INTEGER NOT NULL,
    memberId INTEGER NOT NULL,
    borrowDate DATE NOT NULL,
    returnDate DATE,
    CONSTRAINT FK_BorrowRecords_Books FOREIGN KEY (bookId) REFERENCES Books(id),
    CONSTRAINT FK_BorrowRecords_Members FOREIGN KEY (memberId) REFERENCES Members(id)
);
