import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitacionPage } from './invitacion.page';

describe('InvitacionPage', () => {
  let component: InvitacionPage;
  let fixture: ComponentFixture<InvitacionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitacionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(InvitacionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
