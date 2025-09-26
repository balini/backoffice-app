import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientesService } from './cliente-lista.service';
import { Cliente } from './cliente.model';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {
  clientes: Cliente[] = [];
  displayedColumns: string[] = ['id', 'nome', 'email', 'localizacao', 'agencia', 'conta', 'saldo', 'acoes'];

  constructor(
    private service: ClientesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.service.getAll().subscribe({
      next: (data) => this.clientes = data,
      error: () => this.snackBar.open('Erro ao carregar clientes', 'Fechar', { duration: 3000 })
    });
  }

  deleteCliente(id: number): void {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Cliente deletado', 'Fechar', { duration: 2000 });
          this.loadClientes();
        },
        error: () => this.snackBar.open('Erro ao deletar cliente', 'Fechar', { duration: 3000 })
      });
    }
  }
}
