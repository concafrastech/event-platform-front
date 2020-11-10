import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-group-conteudo',
  styleUrls: [`./form-group-conteudo.component.css`],
  template: `
    <div class="form-group row">
        <div *ngIf="content.id == 'YouTube'">
            <div *ngFor="let input of content.inputs" class="row">
                <label for="{{ 'input' + content.id + input.name }}" class="col-sm-2 col-form-label">{{ input.label }}</label>
                <div class="col-sm-10">
                <input type="{{ input.type }}" class="form-control" id="{{ 'input' + content.id + input.name}}" placeholder="{{ input.placeholder }}">
                </div>
            </div>
        </div>
        <div *ngIf="content.id == 'Zoom'">
            <p>Zoom</p>
        </div>
    </div>
  `
})
export class FormGroupConteudoComponent {

  @Input() content: any;

}