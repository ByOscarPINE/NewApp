import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { Auth } from '../../services/auth';
import { Dialog } from '../../components/dialog/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Dialog],
  templateUrl: './home.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private auth_service = inject(Auth);
  @ViewChild(Dialog) dialog!: Dialog;

  openDialog() {
    this.dialog.open();
  }
  constructor() {
    this.getProducts();
  }
  async getProducts() {
    const products = await this.auth_service.getProducts();
    console.log(products);
  }
  products = signal([
    {
      nombre: 'Smartphone Premium X',
      descripcion: 'Lo último en tecnología con pantalla OLED de 6.7"',
      imagen: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop',
      precio: 899,
      precio_salida: 1099,
      stock: 45,
      categoria: 'Electrónica'
    },
    {
      nombre: 'Reloj Inteligente Ultra',
      descripcion: 'Monitoreo de salud avanzado y batería de 7 días',
      imagen: 'https://images.unsplash.com/photo-1544117518-30df57849bbd?q=80&w=200&auto=format&fit=crop',
      precio: 299,
      precio_salida: 399,
      stock: 120,
      categoria: 'Accesorios'
    },
    {
      nombre: 'Auriculares Noise Cancelling',
      descripcion: 'Cancelación de ruido activa y sonido de alta fidelidad',
      imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop',
      precio: 199,
      precio_salida: 249,
      stock: 75,
      categoria: 'Audio'
    }
  ]);
}
