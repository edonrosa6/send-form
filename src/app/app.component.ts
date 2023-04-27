import { Component, OnInit } from '@angular/core';
import { EmailService } from './services/email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CiudadEstadoService } from './services/ciudad-estado.service';
import { ICiudadYEstado } from './models/ciudad-estado.model';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from './components/alert/alert.component';
import { IEmailRequest } from './models/email.model';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';
import * as e from 'cors';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AppComponent implements OnInit {
  title = 'Green Leaves';
  ciudadesEstados: ICiudadYEstado[] = [];
  selectedCiudadEstado: string = "";
  nombre: string = "";
  email: string = "";
  telefono: string = "";
  fecha: Date = new Date();
  errors: string[] = [];
  form: FormGroup;

  constructor(
    private emailService: EmailService,
    public fb: FormBuilder,
    private ciudadEstadoService: CiudadEstadoService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha: ['', [Validators.required]],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      ciudadYEstado: ['', Validators.required],
    });

    this.ciudadEstadoService.get().subscribe({
      next: data => {
        console.log(data);
        this.ciudadesEstados = data;
      },
      error: err => {
        this.ciudadesEstados = [];
      }
    })
  }


  send() {
    if (this.form.invalid) {
      if (this.form.get('fecha')?.errors?.['required']) {
        this.errors.push('Fecha inválida');
      }

      if (
        this.form.get('nombre')?.errors ||
        this.form.get('correo')?.errors?.['required'] ||
        this.form.get('telefono')?.errors?.['required'] ||
        this.form.get('ciudadYEstado')?.errors?.['required']) {
        this.errors.push('Hace falta data');
      }

      if (this.form.get('correo')?.errors?.['email']) {
        this.errors.push('Debes insertar un correo válido');
      }

      this.dialog.open(AlertComponent, {
        data: { title: "Error", message: "Han ocurrido los siguientes errores: ", errors: this.errors },
        width: "350px"
      })

      this.errors = [];

      return;
    }

    this.emailService.post(this.form.value).subscribe({
      next: data => {
        console.log(data);
        this.dialog.open(AlertComponent, {
          data: { title: "Excelente", message: "Se ha creado el registro correctamente" },
          width: '350px'
        });
      },
      error: err => {
        this.dialog.open(AlertComponent, {
          data: { title: "Error", message: "Ha ocurrido un error intentalo de nuevo", errors: [] },
          width: '350px'
        });
      }
    });
  }
}
