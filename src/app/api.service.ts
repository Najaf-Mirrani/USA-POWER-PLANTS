import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  getMessage() {
    return this.http.get('http://localhost:3000/api/plants');
  }

  getPlants(filters: { n: number; state: string; name: string[] }) {
    return this.http.get(
      `http://localhost:3000/api/plants?n=${filters?.n ? filters.n : 0}&state=${
        filters?.state && filters?.state != 'All' ? filters?.state : null
      }&`
    );
  }

  getState(state: string) {
    return this.http.get(`http://localhost:3000/api/state?state=${state}`);
  }
}
