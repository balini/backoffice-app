import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientesService } from '../clientes-lista/cliente-lista.service';
import { Cliente } from '../cliente.model';

type DialogData = { mode: 'create' | 'edit'; cliente?: Cliente };

@Component({
  selector: 'app-cliente-form-dialog',
  templateUrl: './cliente-form-dialog.component.html',
  styleUrls: ['./cliente-form-dialog.component.scss']
})
export class ClienteFormDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<ClienteFormDialogComponent>,
    private fb: FormBuilder,
    private service: ClientesService,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: [data.cliente?.nome ?? '', Validators.required],
      email: [data.cliente?.email ?? '', [Validators.required, Validators.email]],
      localizacao: [data.cliente?.localizacao ?? ''],
      agencia: [data.cliente?.agencia ?? ''],
      conta: [data.cliente?.conta ?? ''],
      saldo: [data.cliente?.saldo ?? 0]
    });
  }

  save() {
    if (this.form.invalid) return;

    const payload: Cliente = { ...(this.data.cliente ?? {}), ...this.form.value };

    if (this.data.mode === 'create') {
      this.service.create(payload).subscribe({
        next: () => {
          this.snack.open('Cliente criado', 'Fechar', { duration: 2000 });
          this.dialogRef.close('saved');
        },
        error: () => this.snack.open('Erro ao criar cliente', 'Fechar', { duration: 3000 })
      });
    } else {
      this.service.update(payload.id!, payload).subscribe({
        next: () => {
          this.snack.open('Cliente atualizado', 'Fechar', { duration: 2000 });
          this.dialogRef.close('saved');
        },
        error: () => this.snack.open('Erro ao atualizar cliente', 'Fechar', { duration: 3000 })
      });
    }
  }
}
