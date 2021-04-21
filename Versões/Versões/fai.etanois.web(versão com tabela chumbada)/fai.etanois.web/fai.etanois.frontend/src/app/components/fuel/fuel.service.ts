import { Fuel } from './fuel.model';
import { Injectable } from '@angular/core';
import { APP_API } from 'src/app/app.api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/authorization';


@Injectable({
    providedIn: 'root'
})

export class FuelService {
    [x: string]: any;

    endpoint: string = ` ${APP_API}fuel`

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
    create(fuel: Fuel): Observable<Fuel> {
        return this.http.post<Fuel>(`${this.endpoint}/new`, fuel, { headers: this.authorizationService.getHttpHeaders() }).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
        );
    }

    readAll(): Observable<Fuel[]> {
        return this.http.get<Fuel[]>(this.endpoint, { headers: this.authorizationService.getHttpHeaders() }).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
        );
    }

    readById(id: number): Observable<Fuel> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<Fuel>(url, { headers: this.authorizationService.getHttpHeaders() }).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
        );
    }

    update(fuel: Fuel): Observable<Fuel> {
        console.log(fuel);
        const url = `${this.endpoint}/${fuel.id}`;
        return this.http.patch<Fuel>(url, fuel, { headers: this.authorizationService.getHttpHeaders() }).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
        );
    }

    delete(id: number): Observable<Fuel> {
        console.log(this.authorizationService.getHttpHeaders());
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<Fuel>(url, { headers: this.authorizationService.getHttpHeaders() }).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
        );
    }

    errorHandler(e: any): Observable<any> {
        console.log(e)
        this.showMessage("Ocorreu um erro!", true)
        return EMPTY;
    }

}