import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompararPage } from './comparar.page';

describe('CompararPage', () => {
  let component: CompararPage;
  let fixture: ComponentFixture<CompararPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompararPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompararPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
