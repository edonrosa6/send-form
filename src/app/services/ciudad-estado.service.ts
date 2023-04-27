import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IEmailRequest } from '../models/email.model';
import { ICiudadYEstado } from '../models/ciudad-estado.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CiudadEstadoService {
    baseAddress = environment.apiBaseAddress;

    constructor(private http: HttpClient) { }

    get(): Observable<ICiudadYEstado[]> {
        const url = this.baseAddress + "ciudadYEstado";
        return this.http.get<ICiudadYEstado[]>(url);
    }
}
