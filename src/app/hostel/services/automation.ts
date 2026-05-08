import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {

  private api = 'http://localhost:8090/api/automation';

  constructor(private http: HttpClient) {}

  runAutomation() {
    return this.http.get(this.api);
  }
}
