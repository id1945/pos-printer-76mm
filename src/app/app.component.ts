import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  name = '';
  phone = '';
  address = '';
  code = '';
  sum = 0;
  description = '';
  
  constructor(public print: NgxPrintElementService) {
    const dataStore = localStorage.getItem('Z.BRASS');
    if (dataStore) {
      const data = JSON.parse(dataStore);
      this.name = data.name;
      this.phone = data.phone;
      this.address = data.address;
      this.code = data.code;
      this.sum = data.sum;
      this.description = data.description;
    }
  }

  public config = {
    printMode: 'template-popup', // template
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Hello World',
    templateString: '<header>I\'m part of the template header</header>{{printBody}}<footer>I\'m part of the template footer</footer>',
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: ['td { border: 1px solid black; color: green; }', 'table { border: 1px solid black; color: red }', 'header, table, footer { margin: auto; text-align: center; }']
  }

  onPrint1(id: string) {
    this.print.print(id).subscribe(console.log)
  }

  onPrint2(id: string) {
    this.print.print(id, this.config).subscribe(console.log)
  }

  onPrint3(id: string) {
    this.print.print(id, { ...this.config, printMode: 'template' }).subscribe(console.log)
  }

  onClick() {
    localStorage.setItem('Z.BRASS', JSON.stringify({
      name: this.name,
      phone: this.phone,
      address: this.address,
      code: this.code,
      sum: this.sum,
      description: this.description,
    }))
  }

  convertNumberToWords(number) {
    const units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười', 'mười một', 'mười hai', 'mười ba', 'mười bốn', 'mười lăm', 'mười sáu', 'mười bảy', 'mười tám', 'mười chín'];
    const powersOfTen = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ', 'tỷ tỷ'];
    let result = '';
    let index = 0;
    
    while (number > 0) {
      const currentNumber = number % 1000;
      
      if (currentNumber > 0) {
        const currentNumberWords = this.convertThreeDigitNumberToWords(currentNumber);
        result = currentNumberWords + ' ' + powersOfTen[index] + ' ' + result;
      }
      
      index++;
      number = Math.floor(number / 1000);
    }
    
    return result.trim();
  }
  
  convertThreeDigitNumberToWords(number) {
    const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
    const hundreds = ['', 'một trăm', 'hai trăm', 'ba trăm', 'bốn trăm', 'năm trăm', 'sáu trăm', 'bảy trăm', 'tám trăm', 'chín trăm'];
    let result = '';
    
    const hundredsDigit = Math.floor(number / 100);
    const tensDigit = Math.floor((number % 100) / 10);
    const onesDigit = number % 10;
    
    if (hundredsDigit > 0) {
      result += hundreds[hundredsDigit] + ' ';
    }
    
    if (tensDigit > 0) {
      if (tensDigit === 1) {
        if (onesDigit === 5) {
          result += 'mười lăm';
        } else {
          result += 'mười ' + ones[onesDigit];
        }
      } else {
        result += tens[tensDigit] + ' ' + ones[onesDigit];
      }
    } else if (onesDigit > 0) {
      result += ones[onesDigit];
    }
    
    return result.trim();
  }
}
