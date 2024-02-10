import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSuperHerosComponent } from './list-super-heros.component';

describe('ListSuperHerosComponent', () => {
  let component: ListSuperHerosComponent;
  let fixture: ComponentFixture<ListSuperHerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSuperHerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSuperHerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
