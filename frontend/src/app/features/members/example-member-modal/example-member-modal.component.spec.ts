import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleMemberModalComponent } from './example-member-modal.component';

describe('ExampleMemberModalComponent', () => {
  let component: ExampleMemberModalComponent;
  let fixture: ComponentFixture<ExampleMemberModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleMemberModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleMemberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
