import { BASE_URL } from './../../utils/constants';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authPath = 'auth/token/';

  constructor(
    private http: HttpClient
  ) { }

  public doLogin = async (username: string, password: string) => {
    return await this.http.post(BASE_URL + this.authPath, { username, password })
      .toPromise()
      .then((res: { payload: { id: number, token: string } }) => {
        sessionStorage.setItem('session_data', JSON.stringify(res.payload));
        return res.payload.id;
      })
      .catch((err) => {
        throw err;
      });
  }

  public getHeaders = (): HttpHeaders => {
    return new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
  }

  private getToken = (): string => {
    return JSON.parse(sessionStorage.getItem('session_data')).token;
  }

  private getUserId = (): number => {
    return JSON.parse(sessionStorage.getItem('session_data')).id;
  }
}
