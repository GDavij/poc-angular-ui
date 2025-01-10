import { PaginatedList } from "@models/paginated-list";
import db from "../../drivers/sqlite";
import { Member } from "../../models/member";

export class MembersRepository {
  public get(id: number): Member | undefined {
    return db
      .prepare<number, Member>("SELECT * FROM members WHERE id = ?")
      .get(id);
  }

  public listPageFilteringEmailAndAge(page: number, pageSize: number, email: string | undefined, phone: string | undefined): PaginatedList<Member> {
    try {
      //This should not be applied in repository layer, just for simplicity..

      let query = "SELECT * FROM members";
      query = this.addFilters(query, email, phone);
      query = query + ` LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`;
      
      let countQuery = "SELECT COUNT(1) as count FROM members";
      countQuery = this.addFilters(countQuery, email, phone);

      const members = db.prepare<[], Member>(query).all();
      const count = db.prepare<[], { count: number}>(countQuery).get()!.count;

      return PaginatedList.forArray(members, count, page);

    } catch (err) {
      return PaginatedList.empty;
    }
  }

  private addFilters(query: string, email: string | undefined, phone: string | undefined) {
    if (email && phone) {
      query = query + ` WHERE email LIKE '%${email}%' AND phone LIKE '%${phone}%'`;
    } else if (phone) {
      query = query + ` WHERE phone LIKE '%${phone}%'`
    } else if (email) {
      query = query + ` WHERE email LIKE '%${email}%'`
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
