
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class PositionService {
    constructor(private http: HttpClient){}

    private baseUrl: string = environment.url;

    getAll():Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/position/GetAll`);
    }

    getAllActive():Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/position/GetAllActive`);
    }

    getById(id: number):Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/position/${id}`);
    }

    getAllByPositionId(positionId: number):Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/candidate/GetAllByPositionId/${positionId}`);
    }

    create(request: any):Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/position`, request);
    }

    hire(request: any):Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/employee`, request);
    }

    update(id: number, request: any):Observable<any> {
        return this.http.patch<any>(`${this.baseUrl}/position/${id}`, request);
    }

    hasApplied(request: any) {
        return this.http.post<any>(`${this.baseUrl}/position/HasApply`, request);
    }

    apply(request: any) {
        return this.http.post<any>(`${this.baseUrl}/position/apply`, request);
    }

    delete(id: number) {
        return this.http.delete<any>(`${this.baseUrl}/position/${id}`);
    }
}
