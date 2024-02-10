import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SuperHero } from '../entities/super-hero.entity';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SuperHerosRepositoryService } from '../services/repositories/super-heros.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../components/app-confirmation-dialog/app-confirmation-dialog.component';
import { SuperHeroDetailDialogComponent } from '../components/app-details-dialog/app-details-dialog.component';
import { SuperHeroModalComponent } from '../components/app-form-dialog/app-form-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';


@Component({
  selector: 'app-list-super-heros',
  standalone: true,
  imports: [HttpClientModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatMenuModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './list-super-heros.component.html',
  styleUrl: './list-super-heros.component.scss'
})
export class ListSuperHerosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'FullName', 'actions'];
  dataSource = new MatTableDataSource<SuperHero>();
  private destroy$: Subject<void> = new Subject<void>();
  private searchTerms: Subject<string> = new Subject<string>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private superHeroesService: SuperHerosRepositoryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSuperHeros();
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      this.searchSuperHeros(term);
    });
  }

  getSuperHeros(): void {
    this.superHeroesService.getSuperHeros()
      .subscribe(superHeros => {
        this.dataSource.data = superHeros;
      });
  }

  deleteSuperHero(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.superHeroesService.deleteSuperHero(id);
      }
    });
  }

  openSuperHeroDetails(superHero: SuperHero): void {
    const dialogRef = this.dialog.open(SuperHeroDetailDialogComponent, {
      width: '400px', // Puedes ajustar el ancho según tus necesidades
      data: superHero
    });
  }

  openSuperHeroEdition(superHero: SuperHero): void {
    const dialogRef = this.dialog.open(SuperHeroModalComponent, {
      width: '400px', // Puedes ajustar el ancho según tus necesidades
      data: superHero
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editedSuperHero = this.superHeroesService.editSuperHero(superHero, result);
        const index = this.dataSource.data.findIndex(hero => hero.id === superHero.id);
        if (index !== -1) {
          this.dataSource.data[index] = editedSuperHero;
          this.dataSource._updateChangeSubscription();
        }
        console.log('Superhero edited:', editedSuperHero);
      }
    });
  }

  openAddSuperHeroModal(): void {
    const dialogRef = this.dialog.open(SuperHeroModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.superHeroesService.addSuperHero(result);
      }
    });
  }

  search(target: EventTarget | null): void {
    if (target instanceof HTMLInputElement) {
      const value = target.value;
      this.searchTerms.next(value);
    }
  }


  private searchSuperHeros(term: string): void {
    this.superHeroesService.searchSuperHeroesByName(term)
      .subscribe(superHeros => {
        this.dataSource.data = superHeros;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
