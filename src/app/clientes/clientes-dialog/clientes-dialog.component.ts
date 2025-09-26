import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Cliente {
  id?: number;
  nome: string;
  email: string;
  localizacao: string;
  agencia: string;
  conta: string;
  saldo: number;
}

@Component({
  selector: 'app-clientes-dialog',
  templateUrl: './clientes-dialog.component.html',
  styleUrls: ['clientes-dialog.component.scss']
})
export class ClientesDialogoComponent implements OnInit {

  form: FormGroup;
  errorForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ClientesDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) {
    this.form = this.fb.group({
      nome: [data?.nome || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      localizacao: [data?.localizacao || '', Validators.required],
      agencia: [data?.agencia || '', Validators.required],
      conta: [data?.conta || '', Validators.required],
      saldo: [data?.saldo || 0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.acompanhaForm();
  }

  acompanhaForm(): void {
    this.form.valueChanges.subscribe(() => {
      this.errorForm = false;
    });
  }

  salvar(): void {
    if (this.form.invalid) {
        this.errorForm = true;
        return;
    }

    const cliente = this.form.value;

    if (this.data?.id) {
      this.http.put(`http://localhost:3000/clientes/${this.data.id}`, cliente)
        .subscribe({
          next: () => {
            this.snackBar.open('Cliente editado com sucesso', 'Fechar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: () => {
            this.snackBar.open('Erro ao editar cliente', 'Fechar', { duration: 3000 });
          }
        });
    } else {
      this.http.post('http://localhost:3000/clientes', cliente)
        .subscribe({
          next: () => {
            this.snackBar.open('Cliente adicionado com sucesso', 'Fechar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: () => {
            this.snackBar.open('Erro ao adicionar cliente', 'Fechar', { duration: 3000 });
          }
        });
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
