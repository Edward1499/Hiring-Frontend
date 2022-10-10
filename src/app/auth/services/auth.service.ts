import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private baseUrl: string = environment.url;

    constructor(private http: HttpClient) {

    }
 
    public get getUserId() : string {
        return JSON.parse(localStorage.getItem('user') || '')?.id;
    }
    
    login(request: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/auth/login`, request);
    }

    register(request: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/auth/register`, request);
    }

}