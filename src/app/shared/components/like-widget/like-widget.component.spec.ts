import { LikeWidgetModule } from './like-widget.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeWidgetComponent } from './like-widget.component';

describe('LikeWidgetComponent', () => {
  let component: LikeWidgetComponent;
  let fixture: ComponentFixture<LikeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LikeWidgetModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); chamada de detectChanges é melhor dentro das funções porque permite setar parâmetros antes quando necessário
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Deve criar ID automaticamente quando iniciado (ngOnInit) quando (@Input id) é nulo).', () => {
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('Não deve criar novo ID na inicialização (ngOnInit) quando (@Input id) já existe.', () => {
    component.id = 'testId';
    fixture.detectChanges();
    expect(component.id).toBe('testId');
  });

  // Testar parâmetro Output
  it(`#${LikeWidgetComponent.prototype.like.name} deve disparar (@Output liked) quando chamado`, () => {
    fixture.detectChanges();
    component.liked.subscribe(() => {
      expect(true).toBeTrue();
    });

    component.like();
  });

  // Utilizando "done"
  it(`#${LikeWidgetComponent.prototype.like.name} deve disparar (@Output liked) quando chamado`, done => {
    fixture.detectChanges();
    component.liked.subscribe(() => {
      expect(true).toBeTrue();
      done();
    });

    component.like();
  });

  it(`#${LikeWidgetComponent.prototype.like.name} deve disparar emitir quando chamado`, () => {
    spyOn(component.liked, 'emit');
    fixture.detectChanges();
    component.like();
    expect(component.liked.emit).toHaveBeenCalled();
  });

});
