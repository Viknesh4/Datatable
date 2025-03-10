import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchcomp',
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './searchcomp.component.html',
  styleUrl: './searchcomp.component.css'
})

export class SearchcompComponent implements OnInit {
  searchTerm: string = '';
  data: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<{ records:any[] }>('http://34.23.57.131:5000/records')
      .subscribe(response => {
        this.data = Object.values(response.records); 
        console.log('Data fetched:', this.data);
      }, error => {
        console.error('Error fetching data:', error);
      });
  }

  get filteredData() {
    return this.data.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }
}
