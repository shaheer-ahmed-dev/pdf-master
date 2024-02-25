import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-textfield',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss'],
})
export class TextfieldComponent {

  @Input() placeholder: string = '';
  @Input() icon?: string | null;
  @Input() suffixIcon?: string | null;
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() backgroundColor: string = '';
  @Input() textArea: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() onSuffixIconClick = new EventEmitter<string>();

  TextFieldComponent() { }
  onChange(event: any) {
    this.valueChange.emit(event.target.value);
  }

  onSuffixIconClicked() {
    this.onSuffixIconClick.emit();
  }

}

