
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    constructor(private http: HttpClient){}

    private baseUrl: string = environment.url;

    getAll():Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/language/GetAll`);
    }

    create(request: any):Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/language`, request);
    }

    update(id: number, request: any):Observable<any> {
        return this.http.patch<any>(`${this.baseUrl}/language/${id}`, request);
    }

    delete(id: number) {
        return this.http.delete<any>(`${this.baseUrl}/language/${id}`);
    }
}