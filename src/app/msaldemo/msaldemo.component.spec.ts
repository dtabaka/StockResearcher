import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsaldemoComponent } from './msaldemo.component';

describe('MsaldemoComponent', () => {
  let component: MsaldemoComponent;
  let fixture: ComponentFixture<MsaldemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsaldemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsaldemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
