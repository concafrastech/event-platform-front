import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'form-group-conteudo',
  styleUrls: [`./form-group-conteudo.component.css`],
  template: `
    <div class="form-group">
      <h3>{{ content.title }}</h3>
      <div *ngFor="let input of content.inputs" class="gamb5">
        <label for="{{ 'input' + content.id + input.name }}" class="col-sm-2 col-form-label">{{ input.label }}</label>
        <div class="col-sm-10">
          <input type="{{ input.type }}" class="form-control" id="{{ 'input' + content.id + input.name}}" placeholder="{{ input.placeholder }}">
        </div>
      </div>
      <div class="padd5">
        <input class="form-control" type="text" placeholder="Ordem: {{ ordem + 1 }}" readonly>
      </div>
      <div class="padd5">
        <button class="btn btn-danger" (click)="removeType(content)"><i class="glyphicon glyphicon-trash"></i></button>
      </div>
    </div>
  `
})
export class FormGroupConteudoComponent {

  @Input() content: any;
  @Input() ordem: any;

  @Output() excluir = new EventEmitter();

  removeType(value: any) {
    this.excluir.emit(value);
  }

}