import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult, PaginatedList } from '../../models/shared';
import { Member } from '../../models/members';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private readonly _baseUrl: string = 'http://localhost:3000';

  constructor(private readonly _httpClient: HttpClient) {}

  list(email: string, phone: string, page: number, pageSize: number) {
    return this._httpClient.get<ApiResult<PaginatedList<Member>>>(
      `${this._baseUrl}/api/members?${this.toQueryParams({
        email,
        phone,
        page,
        pageSize,
      })}`
    );
  }

  get(id: string) {
    return this._httpClient.get<ApiResult<Member>>(
      `${this._baseUrl}/api/members/${id}`
    );
  }

  save(id: string | null, member: Member) {
    if (id) {
      return this._httpClient.put<ApiResult<Member>>(
        `${this._baseUrl}/api/members/${id}`,
        member
      );
    }

    return this._httpClient.post<ApiResult<Member>>(
      `${this._baseUrl}/api/members`,
      member
    );
  }

  private toQueryParams(object: { [key: string]: any }): string {
    let query = '';
    for (const key in object) {
      if (!!object[key]) {
        query += `&${key}=${object[key]}`;
      }
    }

    return query;
  }
}
