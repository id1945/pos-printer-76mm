import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxPrintElementService } from 'ngx-print-element';

interface Pos {
  id?: string;
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
  
  public formGroup!: FormGroup;
  public setting = {
    style: {
      fontSize: '19',
      sending: {
        fontSize: '24'
      }
    },
    shop: {
      title: 'Z.BRASS',
      name: 'Người gửi: Dương Hữu Đại',
      address: 'Địa chỉ: Hồ Tùng Mậu, Cầu Giấy, Hà Nội',
      phone: 'Số điện thoại: 0845.882.882',
      logo: {
        width: '100',
        height: '100',
        url: 'assets/01.jpg'
      }
    },
    sending: {
      name: 'Người nhận:',
      address: 'Địa chỉ:',
      phone: 'Điện thoại:',
      content: 'Nội dung:',
      code: 'Mã vận đơn:',
      sum: 'Tổng thu COD:',
      description: 'Ghi chú:',
      currency: 'VNĐ',
      format: '1.0' // https://stackblitz.com/edit/angular-currency-decimal-percent-pipe
    }
  }
  public data: Pos[] = [];

  constructor(public print: NgxPrintElementService) {
    const store = localStorage.getItem('Z.BRASS');
    const posData: Pos = store ? JSON.parse(store) : null;
    this.initForm(posData);

    const settingDefault = localStorage.getItem('Z.BRASS.SETTING');
    if (settingDefault) {
      this.setting = JSON.parse(settingDefault);
    }

    const storeData = localStorage.getItem('Z.BRASS.DATA');
    this.data = storeData ? JSON.parse(storeData) : [];
  }

  initForm(posData: Pos) {
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
  }

  get f() { return this.formGroup.controls; }

  onClick() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const formData: Pos = this.formGroup.value;
      this.print.print('demo').subscribe(console.log);
      // Add to list
      const store = localStorage.getItem('Z.BRASS.DATA');
      if (store) {
        this.data.push({ id: Math.random() * 1000 + '', ...formData });
        this.data = [...JSON.parse(store), ...this.data];
      }
      // Save db
      localStorage.setItem('Z.BRASS', JSON.stringify(formData));
      localStorage.setItem('Z.BRASS.DATA', JSON.stringify(this.data));
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

  onSelected(item: Pos) {
    this.initForm(item);
  }
  
  onDelete(item: Pos) {
    const remove = this.data.filter(f => f.id !== item.id);
    if (remove.length) {
      this.data = remove;
      localStorage.setItem('Z.BRASS.DATA', JSON.stringify(remove));
    }
  }
}
