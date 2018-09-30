import { Injectable } from '@angular/core';
import {User} from "../_models/user";
import {config} from "../../config";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {
  public constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<User[]>(`${config.apiUrl}/users`);
  }
  public getById(id: number) {
    return this.http.get(`${config.apiUrl}/users/` + id);
  }
  public register(user: User) {
    return this.http.post(`${config.apiUrl}/users/register`, user);
  }
  public update(user: User) {
    return this.http.put(`${config.apiUrl}/users/` + user.id, user);
  }
  public delete(id: number) {
    return this.http.delete(`${config.apiUrl}/users/` + id);
  }
}
