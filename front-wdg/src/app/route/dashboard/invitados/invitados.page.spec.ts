import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitadosPage } from './invitados.page';

describe('InvitadosPage', () => {
  let component: InvitadosPage;
  let fixture: ComponentFixture<InvitadosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitadosPage],
    }).compileComponents();

    fixture = TestBed.createComponent(InvitadosPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
