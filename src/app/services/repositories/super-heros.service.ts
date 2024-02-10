import { Injectable } from '@angular/core';
import { SuperHerosService } from '../datasources/super-heros.service';
import { SuperHeroResponse } from '../../entities/super-hero-response.entity';
import { SuperHero } from '../../entities/super-hero.entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SuperHerosRepositoryService {
    private superHeros: BehaviorSubject<SuperHero[]> = new BehaviorSubject<SuperHero[]>([]);

    constructor(private superheroService: SuperHerosService) {
        if (this.superHeros.value.length === 0) {
            this.loadSuperHeros();
        }
    }

    private loadSuperHeros(): void {
        this.superheroService.getSuperHeros().pipe(
            map((superheroResponses: SuperHeroResponse[]) =>
                superheroResponses.map((superheroResponse: SuperHeroResponse) =>
                    this.transformToSuperHero(superheroResponse)
                )
            )
        ).subscribe(superheroes => {
            this.superHeros.next(superheroes);
        });
    }

    getSuperHeros(): Observable<SuperHero[]> {
        return this.superHeros.asObservable();
    }

    getSuperHeroById(id: number): Observable<SuperHero | undefined> {
        return this.superHeros.pipe(
            map(superheroes => superheroes.find(superhero => superhero.id === id))
        );
    }

    deleteSuperHero(id: number): void {
        const currentSuperHeros = this.superHeros.value;
        const updatedSuperHeros = currentSuperHeros.filter(superhero => superhero.id !== id);
        this.superHeros.next(updatedSuperHeros);
    }

    editSuperHero(superHero: SuperHero, editedData: Partial<SuperHero>): SuperHero {
        return { ...superHero, ...editedData };
    }

    addSuperHero(superHero: SuperHero): void {
        const currentSuperHeros = this.superHeros.value;
        const newId = currentSuperHeros.length + 1;
        const updatedSuperHeros = [...currentSuperHeros, { ...superHero, id: newId }];
        updatedSuperHeros.sort((a, b) => a.name.localeCompare(b.name));
        this.superHeros.next(updatedSuperHeros);
    }

    searchSuperHeroesByName(keyword: string): Observable<SuperHero[]> {
        return this.superHeros.pipe(
            map(superheroes => superheroes.filter(superhero => superhero.name.toLowerCase().includes(keyword.toLowerCase())))
        );
    }

    private transformToSuperHero(superheroResponse: SuperHeroResponse): SuperHero {
        return {
            id: superheroResponse.id,
            name: superheroResponse.name,
            fullName: superheroResponse.biography.fullName,
            image: superheroResponse.images.sm,
        };
    }
}
