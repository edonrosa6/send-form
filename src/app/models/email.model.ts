export interface IEmailRequest {
    nombre: string;
    correo: string;
    telefono: string;
    ciudadYEstado: string | null;
    fecha: Date;
}