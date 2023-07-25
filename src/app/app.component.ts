import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxPrintElementService } from 'ngx-print-element';

interface Pos {
  name: string;
  phone: string;
  address: string;
  code: string;
  sum: number;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public formGroup: FormGroup;

  constructor(public print: NgxPrintElementService) {
    const store = localStorage.getItem('Z.BRASS');
    const posData: Pos = store ? JSON.parse(store) : null;
    this.formGroup = new FormGroup({
      name: new FormControl(posData?.name, {
        validators: [Validators.required],
      }),
      phone: new FormControl(posData?.phone, {
        validators: [Validators.required],
      }),
      address: new FormControl(posData?.address, {
        validators: [Validators.required],
      }),
      code: new FormControl(posData?.code),
      sum: new FormControl(posData?.sum ?? 0, { 
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl(posData?.description),
    })
  }

  get f() { return this.formGroup.controls; }

  onClick() {
    console.log(this.f)
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const formData: Pos = this.formGroup.value;
      this.print.print('demo').subscribe(console.log);
      localStorage.setItem('Z.BRASS', JSON.stringify(formData));
    }
  }
}
