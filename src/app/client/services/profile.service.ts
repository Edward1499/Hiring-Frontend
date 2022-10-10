import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ProfileService {

    private baseUrl: string = environment.url;

    private languages: any[] = [];
    
    public get getLanguages() : any[] {
        return this.languages;
    }

    private expiriences: any[] = [];
    
    public get getExpiriences() : any[] {
        return this.expiriences;
    }

    private trainings: any[] = [];
    
    public get getTrainings() : any[] {
        return this.trainings;
    }
    
    constructor(private http: HttpClient) { }

    getDepartments():Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/department/GetAllActive`);
    }

    getCompetitions():Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/competition/GetAllActive`);
    }

    getLanguagesList():Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/language/GetAllActive`);
    }

    getAcademicLevels():Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/academicLevel/GetAllActive`);
    }

    getCandidateByUserId(id: string) {
        return this.http.get<any>(`${this.baseUrl}/candidate/GetByUserId/${id}`);
    }

    getCandidateById(id: number) {
        return this.http.get<any>(`${this.baseUrl}/candidate/${id}`);
    }

    createCandidate(request: any):Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/candidate`, request);
    }

    updateCandidate(id: number, request: any):Observable<any> {
        return this.http.patch<any>(`${this.baseUrl}/candidate/${id}`, request);
    }

    clearState(): void {
        this.languages = [];
        this.expiriences = [];
        this.trainings = [];
    }

    pushLanguage(language: any) {
        this.languages.push(language);
    }

    removeLanguage(index: number) {
        this.languages.splice(index, 1);
    }

    pushExpirience(expirience: any) {
        this.expiriences.push(expirience);
    }

    removeExpirience(index: number) {
        this.expiriences.splice(index, 1);
    }

    pushTraining(training: any) {
        this.trainings.push(training);
    }

    removeTraining(index: number) {
        this.trainings.splice(index, 1);
    }
}