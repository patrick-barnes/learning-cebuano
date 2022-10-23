import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordRootComponent } from './word-root.component';

describe('WordRootComponent', () => {
  let component: WordRootComponent;
  let fixture: ComponentFixture<WordRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
