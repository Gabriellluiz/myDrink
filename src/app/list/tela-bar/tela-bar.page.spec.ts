import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaBarPage } from './tela-bar.page';

describe('TelaBarPage', () => {
  let component: TelaBarPage;
  let fixture: ComponentFixture<TelaBarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaBarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
