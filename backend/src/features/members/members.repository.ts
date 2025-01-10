import { PaginatedList } from "@models/paginated-list";
import db from "../../drivers/sqlite";
import { Member } from "../../models/member";

export class MembersRepository {
  public get(id: number): Member | undefined {
    return db
      .prepare<number, Member>("SELECT * FROM members WHERE id = ?")
      .get(id);
  }

  public listPage(page: number, pageSize: number): PaginatedList<Member> {
    try {
      const members = db
        .prepare<[number, number], Member>(
          "SELECT * FROM members LIMIT ? OFFSET ?"
        )
        .all(pageSize, (page - 1) * pageSize);

      const count = db
        .prepare<[], number>("SELECT COUNT(1) as count FROM members")
        .get()!;

      return PaginatedList.forArray(members, count, page);
    } catch (err) {
      return PaginatedList.empty;
    }
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
