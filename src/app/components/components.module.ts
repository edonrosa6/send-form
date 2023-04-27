import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        AlertComponent
    ],
    imports: [
        MatButtonModule,
        CommonModule,
        MatDialogModule
    ]
})
export class ComponentsModule { }