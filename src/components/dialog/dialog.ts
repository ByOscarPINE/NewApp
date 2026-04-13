import { ChangeDetectionStrategy, Component, inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <dialog #dialogElement class="m-auto rounded-2xl p-0 shadow-2xl backdrop:backdrop-blur-sm border-none bg-white w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
      <div class="relative bg-white font-sans">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex justify-between items-center">
          <h2 class="text-2xl font-bold tracking-tight">Añadir Nuevo Producto</h2>
          <button (click)="close()" class="p-2 hover:bg-white/20 rounded-lg transition-colors outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="p-8 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nombre -->
            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700">Nombre del Producto</label>
              <input type="text" formControlName="nombre" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 hover:bg-white" placeholder="Ej: Smartphone Ultra">
            </div>

            <!-- Categoría -->
            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700">Categoría</label>
              <select formControlName="categoria" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 hover:bg-white appearance-none">
                <option value="">Seleccionar categoría</option>
                <option value="Electrónica">Electrónica</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Audio">Audio</option>
                <option value="Otros">Otros</option>
              </select>
            </div>

            <!-- Imagen URL -->
            <div class="md:col-span-2 space-y-1">
              <label class="text-sm font-semibold text-gray-700">URL de la Imagen</label>
              <input type="text" formControlName="imagen" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 hover:bg-white" placeholder="https://images.unsplash.com/...">
            </div>

            <!-- Precio -->
            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700">Precio Venta ($)</label>
              <input type="number" formControlName="precio" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 hover:bg-white" placeholder="0.00">
            </div>

            <!-- Precio Salida -->
            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700">Precio Original ($)</label>
              <input type="number" formControlName="precio_salida" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 hover:bg-white" placeholder="0.00">
            </div>

            <!-- Stock -->
            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700">Stock Inicial</label>
              <input type="number" formControlName="stock" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 hover:bg-white" placeholder="0">
            </div>

            <!-- Descripción -->
            <div class="md:col-span-2 space-y-1">
              <label class="text-sm font-semibold text-gray-700">Descripción</label>
              <textarea formControlName="descripcion" rows="3" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 hover:bg-white resize-none" placeholder="Breve descripción del producto..."></textarea>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-4">
            <button type="button" (click)="close()" class="flex-1 px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all active:scale-95">
              Cancelar
            </button>
            <button type="submit" [disabled]="productForm.invalid" class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-blue-200/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 transition-all">
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </dialog>
  `,
  styles: `
    :host {
      display: contents;
    }
    dialog {
      margin: auto;
    }
    dialog::backdrop {
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(8px);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  private fb = inject(FormBuilder);
  @ViewChild('dialogElement') dialogElement!: ElementRef<HTMLDialogElement>;

  productForm = this.fb.group({
    nombre: ['', Validators.required],
    imagen: ['', Validators.required],
    categoria: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0)]],
    precio_salida: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    descripcion: ['', Validators.required]
  });

  open() {
    this.dialogElement.nativeElement.showModal();
  }

  close() {
    this.dialogElement.nativeElement.close();
    this.productForm.reset({
      precio: 0,
      precio_salida: 0,
      stock: 0
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Product Data:', this.productForm.value);
      this.close();
    }
  }
}
