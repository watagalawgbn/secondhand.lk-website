import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Vehicle {
  id: number;
  title: string;
  description: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  location: string;
  contact_email: string;
  contact_phone: string;
  created_at: Date;
}

@Component({
  selector: 'app-adreviews',
  templateUrl: './adreviews.component.html',
  styleUrls: ['./adreviews.component.css']
})
export class AdreviewsComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8000/reviewadd')
      .subscribe(
        (data) => {
          this.vehicles = data.result;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  acceptAd(adId: number) {
    this.http.put<any>('http://localhost:8000/acceptad', { id: adId })
      .subscribe(
        (response) => {
          alert('Ad accepted successfully:');
          window.location.reload();
        },
        (error) => {
          console.error('Error accepting ad:', error);
     
        }
      );
  }

  
}
