import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IEmailRequest } from '../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  baseAddress = environment.apiBaseAddress;

  constructor(private http: HttpClient) { }

  post(request: IEmailRequest) {
    const url = this.baseAddress + "email";
    return this.http.post<any>(url, request);
  }
}
