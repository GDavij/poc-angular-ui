import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBodyComponent } from './table-body.component';

describe('TableBodyComponent', () => {
  let component: TableBodyComponent;
  let fixture: ComponentFixture<TableBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
