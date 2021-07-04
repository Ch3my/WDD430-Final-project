import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  categories: Category[] = []
  title: String = 'Add Expense'
  btnText: String = 'Save expense'

  constructor() { }

  ngOnInit(): void {
    // TODO. Leer categorias desde servicio
  }

  onSubmit(){
    // Se ejecuta desde el boton
    // llama a onCreate si es nuevo y onUpdate
    // cuando editan un documento
    console.log("onSubmit")
  }

  // 
  onCreate() {
    // TODO. Crear Documento nuevo 
  }

  onEdit() {
    // TODO. Cargar datos del documento que estamos editando
    // Actualizar el titulo
    this.title = 'Edit Expense'
    this.btnText = 'Update expense'
  }

  onUpdate() {
    // TODO. Guardar documento creado usando el servicio
  }

}
