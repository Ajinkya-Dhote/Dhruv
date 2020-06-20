import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {  FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


enum Selectors {
    LESS_THAN = "less than",
    LESS_THAN_OR_EQUAL = "less than or equal",
    IN_BETWEEN = "in between",
    GREATER_THAN = "greater than",
    GREATER_THAN_OR_EQUAL = "greater than or equal"
}

@Component({
  selector: 'app-discount-selector',
  templateUrl: './discount-selector.component.html',
  styleUrls: ['./discount-selector.component.sass']
})
export class DiscountSelectorComponent implements OnInit {
    selectedSelector = "in between";

    @Input() id: number;
    @Output() save = new EventEmitter();
    @Output() delete = new EventEmitter();

    schemeForm: FormGroup;
    xControl = new FormControl('');
    yControl = new FormControl('');
    comparatorControl = new FormControl('', Validators.required);

    selectors = [
      {value:  Selectors.LESS_THAN, display:  "less than '<'"},
      {value:  Selectors.LESS_THAN_OR_EQUAL, display:  "less than '<' or equal"},
      {value:  Selectors.IN_BETWEEN, display:  "in between"},
      {value:  Selectors.GREATER_THAN, display:  "greater than '>'"},
      {value:  Selectors.GREATER_THAN_OR_EQUAL, display:  "greater than '>' or equal"},
    ]

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.schemeForm = this.formBuilder.group({
                        x: this.xControl,
                        y: this.yControl,
                        comparator: this.comparatorControl
                    });
    }

    isEnable(field, selector) {
        if (field === 'after') {
          if ([Selectors.LESS_THAN, Selectors.LESS_THAN_OR_EQUAL, Selectors.IN_BETWEEN].indexOf(selector.value) !== -1) {
              return true;
          }
        } else {
            if ([Selectors.IN_BETWEEN, Selectors.GREATER_THAN, Selectors.GREATER_THAN_OR_EQUAL].indexOf(selector.value) !== -1) {
                return true;
            }
        }
        return false;
    }

    onSubmit() {
       this.save.emit(this.schemeForm.value);
    }


    deleteClicked() {
        this.delete.emit(this.id);
    }

}
