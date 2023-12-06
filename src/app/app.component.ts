import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxPrintElementService } from 'ngx-print-element';

interface Pos {
  name: string;
  phone: string;
  address: string;
  content: string;
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
  public setting = {
    style: {
      fontSize: '19',
      sending: {
        fontSize: '19'
      }
    },
    shop: {
      shopName: 'Z.BRASS',
      name: 'Dương Hữu Đại',
      address: 'Địa chỉ: Hồ Tùng Mậu, Cầu Giấy, Hà Nội',
      phone: 'Hotline: 0845.882.882',
      logo: {
        width: '100',
        height: '100',
        url: 'assets/01.jpg'
      }
    },
    sending: {
      name: 'Tên người nhận:',
      address: 'Địa chỉ:',
      phone: 'Điện thoại:',
      content: 'Nội dung:',
      code: 'Mã vận đơn:',
      sum: 'Tổng thu COD:',
      description: 'Ghi chú:',
      currency: 'VNĐ'
    }
  }

  constructor(public print: NgxPrintElementService) {
    const store = localStorage.getItem('Z.BRASS');
    const posData: Pos = store ? JSON.parse(store) : null;
    this.formGroup = new FormGroup({
      shopName: new FormControl(posData?.shopName, {
        validators: [],
      }),
      name: new FormControl(posData?.name, {
        validators: [],
      }),
      phone: new FormControl(posData?.phone, {
        validators: [Validators.required],
      }),
      address: new FormControl(posData?.address, {
        validators: [Validators.required],
      }),
      content: new FormControl(posData?.content, {
        validators: [Validators.required],
      }),
      code: new FormControl(posData?.code),
      sum: new FormControl(posData?.sum ?? 0, { 
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl(posData?.description),
    });

    const settingDefault = localStorage.getItem('Z.BRASS.SETTING');
    if (settingDefault) {
      this.setting = JSON.parse(settingDefault);
    }
  }

  get f() { return this.formGroup.controls; }

  onClick() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const formData: Pos = this.formGroup.value;
      this.print.print('demo').subscribe(console.log);
      localStorage.setItem('Z.BRASS', JSON.stringify(formData));
    }
  }

  onSettingSave() {
    localStorage.setItem('Z.BRASS.SETTING', JSON.stringify(this.setting));
  }

  onReset() {
    this.formGroup.reset();
    localStorage.removeItem('Z.BRASS');
    localStorage.removeItem('Z.BRASS.SETTING');
    document.location.reload();
  }
}
