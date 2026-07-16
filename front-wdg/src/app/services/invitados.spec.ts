import { TestBed } from '@angular/core/testing';

import { Invitados } from './invitados';

describe('Invitados', () => {
  let service: Invitados;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Invitados);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
