import { Injectable, Input } from '@angular/core';
import { APP_API } from 'src/app/app.api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/authorization';
import { FuelStation } from './fuel_station.model';
import { User } from '../user/user.model';
import { Observable, EMPTY, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class FuelStationService {
    endpoint: string = ` ${APP_API}fuel_station`
    constructor(
        private authorizationService: AuthorizationService,
        private snackBar: MatSnackBar, private http: HttpClient) { }

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, 'X', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ['msg-error'] : ['msg-success']
        })
    }
    /*caso aconteça erro no fuelStation, chamo método errorHandler*/
    create(fuelStation: FuelStation): Observable<FuelStation> {
        return this.http.post<FuelStation>(`${this.endpoint}/new`, fuelStation, { headers: this.authorizationService.getHttpHeaders() }).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
            // catchError(e => this.errorHandler(e))
        );
    }

    read(): Observable<any> {
        return this.http.get<any>(`${this.endpoint}/read-all/1`, { headers: this.authorizationService.getHttpHeaders() }).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
        );
    }

    readById(id: number): Observable<FuelStation> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<FuelStation>(url, { headers: this.authorizationService.getHttpHeaders() }).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
        );
    }

    update(fuelStation: FuelStation): Observable<FuelStation> {
        const url = `${this.endpoint}/${fuelStation.id}`;
        return this.http.put<FuelStation>(url, fuelStation, { headers: this.authorizationService.getHttpHeaders() }).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
        );
    }

    delete(id: number): Observable<FuelStation> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<FuelStation>(url, { headers: this.authorizationService.getHttpHeaders() }).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
        );
    }
    createUpdateAvaliableFuel(fuelStation: FuelStation): Observable<FuelStation> {
        const url = `${this.endpoint}/${fuelStation.id}/available-fuel`;
        return this.http.post<FuelStation>(url, fuelStation, { headers: this.authorizationService.getHttpHeaders() }).pipe(
            map((obj) => obj),
            catchError(e => throwError(e))
        );
    }
    

    errorHandler(e: any): Observable<any> {
        console.log(e)
        this.showMessage("Ocorreu um erro!", true)
        return EMPTY;
    }

    @Input() usuarioLogado: User;
    enviaUsuario(user: Storage): void {
        this.usuarioLogado = JSON.parse(user["usuarioLogado"]);
        this.usuarioLogado = this.usuarioLogado["userResponse"]["payload"];

    }
}