import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesListaComponent } from './clientes-lista.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

describe('ClientesListaComponent', () => {
  let component: ClientesListaComponent;
  let fixture: ComponentFixture<ClientesListaComponent>;
  let httpMock: HttpTestingController;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;

  const mockClientes = [
    { id: 1, nome: 'João da Silva', email: 'joao@santander.com', saldo: 1500.75, localizacao: 'SP', agencia: '883', conta: '123' },
    { id: 2, nome: 'Maria Oliveira', email: 'maria@santander.com', saldo: 2000, localizacao: 'RJ', agencia: '847', conta: '64223' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientesListaComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatSnackBarModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesListaComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    dialog = TestBed.inject(MatDialog);
    component.dataSource = {
    data: [
      { id: 1, nome: 'João', email: 'joao@etc.com', saldo: 500, localizacao: 'SP', agencia: '33', conta: '112' }
    ],
    filter: ''
  } as any;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

    // Mock inicial de clientes
    const req = httpMock.expectOne('http://localhost:3000/clientes');
    req.flush(mockClientes);
  });

  it('deve carregar clientes com sucesso', () => {
    const mockClientes = [
      { id: 1, nome: 'João', email: 'joao@email.com', saldo: 100 },
      { id: 2, nome: 'Maria', email: 'maria@email.com', saldo: 200 }
    ];

    component.carregarClientes();

    const req = httpMock.expectOne('http://localhost:3000/clientes');
    expect(req.request.method).toBe('GET');
    req.flush(mockClientes); // responde a requisição com dados mock

    expect(component.dataSource.data.length).toBe(2);
    expect(component.dataSource.data[0].nome).toBe('João');
  });

 it('deve aplicar filtro corretamente', () => {
    component.pesquisa = 'joão';
    component.filtrarClientes();
    expect(component.dataSource.filter).toBe('joão');

    component.pesquisa = ' JoÃO ';
    component.filtrarClientes();
    expect(component.dataSource.filter).toBe('joão'); // trim e lowercase
  });

});
