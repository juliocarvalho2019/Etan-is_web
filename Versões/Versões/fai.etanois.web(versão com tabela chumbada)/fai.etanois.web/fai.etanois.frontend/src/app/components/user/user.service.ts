import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { User } from './user.model';
import { APP_API } from 'src/app/app.api';
import { AuthorizationService } from 'src/app/authorization';




@Injectable({
    providedIn: 'root'
})

export class UserService {
    endpoint: string = ` ${APP_API}user`

    constructor(
        private authorizationService: AuthorizationService,
        private snackBar: MatSnackBar,
        private http: HttpClient) { }

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, 'X', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ['msg-error'] : ['msg-success']
        })
    }
    /*caso aconteça erro no user, chamo método errorHandler*/
    create(user: User): Observable<User> {
        return this.http.post<User>(`${this.endpoint}/new`, user).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
        );
    }
    // read(): Observable<User[]> {
    //     return this.http.get<User[]>(this.endpoint).pipe(
    //         map((obj) => obj),
    //         catchError(e => this.errorHandler(e))
    //     );
    // }

    readById(id: number): Observable<User> {
        console.log('header', this.authorizationService.getHttpHeaders());

        const url = `${this.endpoint}/${id}`;
        return this.http.get<User>(url, { headers: this.authorizationService.getHttpHeaders() }).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        );
    }

    update(user: User): Observable<User> {
        console.log(user);
        const url = `${this.endpoint}/${user.id}`;
        return this.http.patch<User>(url, user, { headers: this.authorizationService.getHttpHeaders() }).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
        );
    }

    delete(id: number): Observable<User> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<User>(url, { headers: this.authorizationService.getHttpHeaders() }).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        );
    }

    errorHandler(e: any): Observable<any> {
        console.log(e)
        this.showMessage("Ocorreu um erro!", true)
        return EMPTY;
    }

    generateToken(username: string, password: string): Observable<any> {
        console.log("usuario:" + username);
        const url = `${APP_API}auth/token/`;
        return this.http.post<any>(url, { "username": username, "password": password }).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
        );
    }

    verifyExistenceCredentials(email: string): Observable<any> {
        const url = `${APP_API}user/verify_use_of_credentials`;
        return this.http.post<any>(url, { "email": email }).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        );

    }

    forgotPassword(email: string): Observable<any> {
        const url = `${APP_API}user/forgot_password`;
        // console.log("email:", email)
        return this.http.post<any>(url, { "email": email }).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
        );

    }
}