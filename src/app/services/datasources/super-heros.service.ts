import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuperHeroResponse } from '../../entities/super-hero-response.entity';

@Injectable({
    providedIn: 'root',
})
export class SuperHerosService {
    private apiUrl = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api';

    constructor(private http: HttpClient) { }

    getSuperHeros(): Observable<SuperHeroResponse[]> {
        return this.http.get<SuperHeroResponse[]>(`${this.apiUrl}/all.json`);
    }
}




