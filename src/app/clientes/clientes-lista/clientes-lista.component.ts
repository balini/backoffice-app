import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ClientesDialogoComponent, Cliente } from '../clientes-dialog/clientes-dialog.component';
import { ConfirmacaoDialogComponent } from '../clientes-dialog/confirm-dialog.component';



@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'email', 'localizacao', 'agencia', 'conta', 'saldo', 'acoes'];
  clientesFiltrados: Cliente[] = [];
  clientes: Cliente[] = [];
  pesquisa: string = '';

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes() {
    this.http.get<Cliente[]>('http://localhost:3000/clientes').subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.clientesFiltrados = clientes;
      },
      error: () => this.snackBar.open('Erro ao carregar clientes', 'Fechar', { duration: 3000 })
    });
  }

  filtrarClientes() {
    const filterValue = this.pesquisa.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(c =>
      c.nome.toLowerCase().includes(filterValue) ||
      c.email.toLowerCase().includes(filterValue) ||
      c.localizacao.toLowerCase().includes(filterValue)
    );
  }

  adicionarCliente() {
    const dialogRef = this.dialog.open(ClientesDialogoComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe((atualizou: boolean) => {
      if (atualizou) this.carregarClientes();
    });
  }

  editarCliente(cliente: Cliente) {
    const dialogRef = this.dialog.open(ClientesDialogoComponent, {
      width: '600px',
      data: cliente
    });
    dialogRef.afterClosed().subscribe((atualizou: boolean) => {
      if (atualizou) this.carregarClientes();
    });
  }

  confirmarExclusao(cliente: Cliente) {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '400px',
      data: { mensagem: `Deseja realmente deletar o cliente ${cliente.nome}?` }
    });

    dialogRef.afterClosed().subscribe((confirmou: boolean) => {
      if (confirmou) this.deletarCliente(cliente);
    });
  }

  deletarCliente(cliente: Cliente) {
    this.http.delete(`http://localhost:3000/clientes/${cliente.id}`).subscribe({
      next: () => {
        this.snackBar.open('Cliente deletado com sucesso', 'Fechar', { duration: 3000 });
        this.carregarClientes();
      },
      error: () => this.snackBar.open('Erro ao deletar cliente', 'Fechar', { duration: 3000 })
    });
  }
}
