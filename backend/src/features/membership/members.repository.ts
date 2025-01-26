import { PaginatedList } from "@models/paginated-list";
import db from "../../drivers/sqlite";
import { Member } from "../../models/member";

export class MembersRepository {
  public get(id: number): Member | null {
    type RowReturn = {
      memberId: number;
      memberEmail: string;
      memberName: string;
      memberPhone: string;
      borrowId: number;
      borrowDate: string;
      returnDate: string;
      bookId: number;
      bookTitle: string;
      bookAuthor: string;
      bookGenre: string;
      bookPublishedYear: number;
    };

    return db
      .prepare<number, RowReturn>(
        `SELECT m.id as memberId, m.email as memberEmail, m.name as memberName, m.phone as memberPhone,
                                    br.id as borrowId, br.borrowDate, br.returnDate,
                                    bk.id as bookId, bk.title as bookTitle, bk.author as bookAuthor, bk.genre as bookGenre, bk.publishedYear as bookPublishedYear
                             FROM members m
                             LEFT JOIN borrowRecords br ON m.id = br.memberId
                             LEFT JOIN books bk ON bk.id = br.bookId
                             WHERE m.id = ?`
      )
      .all(id)
      .reduce<Member | null>((member, row) => {
        if (!member) {
          member = {
            id: row.memberId,
            email: row.memberEmail,
            name: row.memberName,
            phone: row.memberPhone,
            borrowRecords: []
          };
        }

        if (row.bookId) {
          member.borrowRecords.push({
            borrowId: row.borrowId,
            bookId: row.bookId,
            bookTitle: row.bookTitle,
            bookAuthor: row.bookAuthor,
            genre: row.bookGenre,
            borrowAt: new Date(row.borrowDate),
            publishedYear: row.bookPublishedYear,
            returnAt: row.returnDate ? new Date(row.returnDate) : null
          })
        }

        return member;
      }, null);
  }

  public listPageFilteringEmailAndAge(
    page: number,
    pageSize: number,
    email: string | undefined,
    phone: string | undefined
  ): PaginatedList<Member> {
    try {
      //This should not be applied in repository layer, just for simplicity..
      let query = "SELECT * FROM members";
      query = this.addFilters(query, email, phone);
      query = query + ` LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`;

      let countQuery = "SELECT COUNT(1) as count FROM members";
      countQuery = this.addFilters(countQuery, email, phone);

      const members = db.prepare<[], Member>(query).all();
      const count = db.prepare<[], { count: number }>(countQuery).get()!.count;

      return PaginatedList.forArray(members, count, page);
    } catch (err) {
      return PaginatedList.empty;
    }
  }

  private addFilters(
    query: string,
    email: string | undefined,
    phone: string | undefined
  ) {
    if (email && phone) {
      query =
        query + ` WHERE email LIKE '%${email}%' AND phone LIKE '%${phone}%'`;
    } else if (phone) {
      query = query + ` WHERE phone LIKE '%${phone}%'`;
    } else if (email) {
      query = query + ` WHERE email LIKE '%${email}%'`;
    }

    return query;
  }

  public save(member: Member): boolean {
    try {
      if (member.id) {
        db.prepare(
          "UPDATE members SET name = ?, email = ?, phone = ? WHERE id = ?"
        ).run(member.name, member.email, member.phone, member.id);

        return true;
      }

      db.prepare(
        "INSERT INTO members (name, email, phone) VALUES (?, ?, ?)"
      ).run(member.name, member.email, member.phone);

      return true;
    } catch (err) {
      return false;
    }
  }

  public delete(id: number): boolean {
    try {
      db.prepare("DELETE FROM members WHERE id = ?").run(id);
      return true;
    } catch (err) {
      return false;
    }
  }

  public existsEmail(email: string): boolean {
    return !!db.prepare("SELECT 1 FROM members WHERE email = ?").get(email);
  }

  public existsId(id: number): boolean {
    return !!db.prepare("SELECT 1 FROM members WHERE id = ?").get(id);
  }
}
