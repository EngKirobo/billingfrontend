import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BookPay {
  paysid: number;
  hostel_name: string;
  room_name: string;
  room_id: number;
  stud_id: number;
  name: string;
  controlnumber: string;
  Amount_Paid: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookpayService {

  private api = 'http://localhost:8090/api/bookpays';

  constructor(private http: HttpClient) {}

  getAll(): Observable<BookPay[]> {
    return this.http.get<BookPay[]>(this.api);
  }
}
