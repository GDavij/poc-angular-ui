import { PaginatedList } from "@models/paginated-list";
import db from "../../drivers/sqlite";
import { Book } from "@models/book";

export class BooksRepository {
  public get(id: number): Book | undefined {
    return db
      .prepare<number, Book>("SELECT * FROM books WHERE id = ?")
      .get(id);
  }

  public listPageFiltering(page: number, pageSize: number, bookFilters: Book): PaginatedList<Book> {
    try {

      let query = "SELECT * FROM books";
      query = this.addFilters(query, bookFilters.title,
                                     bookFilters.author,
                                     bookFilters.genre,
                                     bookFilters.publishedYear);

      query = query + ` LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`;

      let countQuery = "SELECT COUNT(1) as count FROM books";
      countQuery = this.addFilters(countQuery, bookFilters.title,
                                               bookFilters.author,
                                               bookFilters.genre,
                                               bookFilters.publishedYear);

      const members = db.prepare<[], Book>(query).all();
      const count = db.prepare<[], { count: number}>(countQuery).get()!.count;

      return PaginatedList.forArray(members, count, page);

    } catch (err) {
      return PaginatedList.empty;
    }
  }

  private addFilters(query: string, title: string, author: string, genre: string, publishedYear: number): string {
    if (title) {
      query = query + ` WHERE title LIKE '%${title}%'`;
    } else if (author) {
      query = query + ` WHERE author LIKE '%${author}%'`
    } else if (genre) {
      query = query + ` WHERE genre LIKE '%${genre}%'`
    } else if (publishedYear) {
      query = query + ` WHERE publishedYear = ${publishedYear}`
    }

    return query;
  }

  public save(book: Book): boolean {
    try {
      if (book.id) {
        db.prepare(
          "UPDATE books SET title = ?, author = ?, genre = ?, publishedYear = ? WHERE id = ?"
        ).run(book.title, book.author, book.genre, book.publishedYear, book.id);

        return true;
      }

      db.prepare(
        `INSERT INTO books (title, author, genre, publishedYear)
         VALUES (?, ?, ?, ?)`
      ).run(book.title, book.author, book.genre, book.publishedYear);

      return true;
    } catch (err) {
      return false;
    }
  }

  public delete(id: number): boolean {
    try {
      db.prepare("DELETE FROM books WHERE id = ?").run(id);
      return true;
    } catch (err) {
      return false;
    }
  }

  public existSimilar(book: Book): boolean {
    return !!db
      .prepare<[string, string], number>(
        "SELECT 1 FROM books WHERE title = ? AND author = ?"
      )
      .get(book.title, book.author);
  }

  public existsId(id: number): boolean {
    return !!db.prepare("SELECT 1 FROM books WHERE id = ?").get(id);
  }
}
