import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesDialogoComponent, Cliente } from '../clientes-dialog/clientes-dialog.component';
import { ConfirmacaoDialogComponent } from '../clientes-dialog/confirm-dialog.component';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ['nome', 'email', 'localizacao', 'agencia', 'conta', 'saldo', 'acoes'];
  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>([]);
  pesquisa: string = '';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.http.get<Cliente[]>('http://localhost:3000/clientes').subscribe({
      next: (clientes) => this.dataSource.data = clientes,
      error: () => this.snackBar.open('Erro ao carregar clientes', 'Fechar', { duration: 3000 })
    });
  }

  filtrarClientes(): void {
    const filterValue = this.pesquisa.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  adicionarCliente(): void {
    const dialogRef = this.dialog.open(ClientesDialogoComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((atualizou: boolean) => {
      if (atualizou) this.carregarClientes();
    });
  }

  editarCliente(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ClientesDialogoComponent, {
      width: '600px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe((atualizou: boolean) => {
      if (atualizou) this.carregarClientes();
    });
  }

  deletarCliente(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '350px',
      data: { mensagem: `Deseja realmente deletar o cliente ${cliente.nome}?` }
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.http.delete(`http://localhost:3000/clientes/${cliente.id}`).subscribe({
          next: () => {
            this.snackBar.open('Cliente deletado com sucesso', 'Fechar', { duration: 3000 });
            this.carregarClientes();
          },
          error: () => this.snackBar.open('Erro ao deletar cliente', 'Fechar', { duration: 3000 })
        });
      }
    });
  }
}
