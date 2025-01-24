import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OracionDeFeComponent } from './oracion-de-fe.component';

describe('OracionDeFeComponent', () => {
  let component: OracionDeFeComponent;
  let fixture: ComponentFixture<OracionDeFeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OracionDeFeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OracionDeFeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
