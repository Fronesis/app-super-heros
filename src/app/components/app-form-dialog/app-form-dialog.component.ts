import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SuperHero } from '../../entities/super-hero.entity';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UppercaseDirective } from '../../directives/uppercase.directive';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, UppercaseDirective],
  templateUrl: './app-form-dialog.component.html'
})
export class SuperHeroModalComponent {
  editedSuperHero: SuperHero;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SuperHeroModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuperHero,
    private fb: FormBuilder
  ) {
    this.editedSuperHero = { ...data };
    this.form = this.fb.group({
      name: [this.editedSuperHero ? this.editedSuperHero.name : '', Validators.required],
      fullName: [this.editedSuperHero ? this.editedSuperHero.fullName : '']
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.editedSuperHero = { ...this.form.value };
      this.dialogRef.close(this.editedSuperHero);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
