import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaBotComponent } from './rea-bot.component';

describe('ReaBotComponent', () => {
  let component: ReaBotComponent;
  let fixture: ComponentFixture<ReaBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
