import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditPositionComponent } from './addEditPosition.component';


describe('AddPositionComponent', () => {
  let component: AddEditPositionComponent;
  let fixture: ComponentFixture<AddEditPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
