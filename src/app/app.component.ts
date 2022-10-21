import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Menu {
  icon: string;
  label: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private http: HttpClient) {}

  selectIdCard(event: any) {
    const base64 = 'data:image/png;base64,';
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // 
    reader.onload = (e) => {
      let image = (e.target?.result as string).substring(base64.length);
      
      if (image) {
        this.http.post('https://apis.aigen.online/aiscript/idcard/v1', {
          image: image,
          return_face: false,
          return_gender: false,
          return_signed: false,
          do_text_correct: false,
        },
        {headers: {
          "X-AIGEN-KEY":"PDniyfjawvs6godilho432jli154r97e4q"
        }}).subscribe(res => console.log(res));
      }
    };
  }
}
