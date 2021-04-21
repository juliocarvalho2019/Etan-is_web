import { HttpHeaders } from "@angular/common/http"
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class AuthorizationService {

   constructor() { }

   getHttpHeaders(): HttpHeaders {
      let header = new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      });

      return header;
   }
}
