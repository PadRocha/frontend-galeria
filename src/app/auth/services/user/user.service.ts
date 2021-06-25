import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { AuthService } from '../auth/auth.service';
import { IUser } from 'app/auth/models/user';

interface userIdentity extends IUser {
  identifier: string;
  roles: string[];
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: String;
  private data$: Observable<userIdentity>
  private userChange$: BehaviorSubject<userIdentity>;

  constructor(
    private _http: HttpClient,
    private _auth: AuthService,
  ) {
    this.url = environment.httpUrl;
    this.data$ = this._http.get<userIdentity>(`${this.url}/user`);
    this.userChange$ = new BehaviorSubject({
      identifier: null,
      nickname: null,
      roles: new Array<string>(),
    });

    if (this._auth.loggedIn()) this.update();
  }

  update(): void {
    this.data$.subscribe(user => this.userChange$.next(user), () => this.destroy());
  }

  destroy(): void {
    this.userChange$.next({
      identifier: null,
      nickname: null,
      roles: new Array<string>(),
    });
  }

  get logged(): boolean {
    return !!this.userChange$.getValue().identifier;
  }

  get getId(): string {
    return this.userChange$.getValue().identifier;
  }

  isEqualTo(_id: string): boolean {
    return this.userChange$.getValue().identifier === _id;
  }

  get getNickname(): string {
    return this.userChange$.getValue().nickname;
  }

  get getRoles(): string[] {
    return this.userChange$.getValue().roles;
  }

  hasRole(roles: 'READ' | 'WRITE' | 'EDIT' | 'GRANT' | 'ADMIN' | ('READ' | 'WRITE' | 'EDIT' | 'GRANT' | 'ADMIN')[]): boolean {
    const currentRoles = this.userChange$.getValue().roles;
    return Array.isArray(roles)
      ? roles.some(r => currentRoles.includes(r))
      : currentRoles.includes(roles);
  }

  getUser(nickname?: string) {
    if (nickname)
      return this._http.get<userIdentity>(`${this.url}/user`, { params: { nickname }, withCredentials: false });
    else
      return this.data$
  }
}
