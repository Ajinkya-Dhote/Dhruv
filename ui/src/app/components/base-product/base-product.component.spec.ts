import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseProductComponent } from './base-product.component';

describe('BaseProductComponent', () => {
  let component: BaseProductComponent;
  let fixture: ComponentFixture<BaseProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
