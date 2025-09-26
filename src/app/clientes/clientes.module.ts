import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClientesDialogoComponent } from './clientes-dialog/clientes-dialog.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClienteFormDialogComponent } from './clientes-dialog/cliente-form-dialog.component';
import { ConfirmacaoDialogComponent } from './clientes-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ClientesListaComponent, ClientesDialogoComponent, ClienteFormDialogComponent, ConfirmacaoDialogComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule
  ],
  exports: [ClientesListaComponent]
})
export class ClientesModule { }
