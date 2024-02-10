import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SuperHero } from '../../entities/super-hero.entity';

@Component({
  selector: 'app-details-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './app-details-dialog.component.html'
})
export class SuperHeroDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: SuperHero) { }
}
