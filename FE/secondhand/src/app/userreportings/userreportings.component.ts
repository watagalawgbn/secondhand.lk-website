import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserReporting {
  reportid: number;
  reported_category: string;
  reporting_note: string;
  reporting_userid: number;
  reported_userid: number;
  createdAt: Date;
}

@Component({
  selector: 'app-userreportings',
  templateUrl: './userreportings.component.html',
  styleUrls: ['./userreportings.component.css']
})
export class UserreportingsComponent implements OnInit {
  userreportings: UserReporting[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8000/viewreport')
      .subscribe(
        (data) => {
          this.userreportings = data.result;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  banuser(reportid: number) {
    this.http.put<any>('http://localhost:8000/banuser', { id: reportid })
      .subscribe(
        (response) => {
          alert('Banned User Successfully:');
          window.location.reload();
        },
        (error) => {
          console.error('Cancel ban request', error);
        }
      );
  }
}
