import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface userchat {
  chat_id: number;
  requesting_user_id: string;
  request_detail: string;
  created_at: Date;
}

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'] //  property name to styleUrls
})
export class RequestsComponent implements OnInit {
  userchats: userchat[] = []; //  property name to match the interface

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8000/userchat')
      .subscribe(
        (data) => {
          this.userchats = data.result;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }
}
