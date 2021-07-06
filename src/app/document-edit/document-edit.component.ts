import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../models/category.model';
import { Document } from '../models/document.model';
import { DocumentService } from '../services/document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  categories: Category[] = []
  title: String = 'Add Expense'
  btnText: String = 'Save expense'
  isEditing: boolean = false
  @Input() editingDocumentId: Number = 0;

  document: Document = {
    id: null,
    description: '',
    amount: 0,
    date: new Date()
  }

  constructor(private documentService: DocumentService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // TODO. Leer categorias desde servicio

  }

  onSubmit() {
    // Se ejecuta desde el boton
    // llama a onCreate si es nuevo y onUpdate
    // cuando editan un documento
    console.log("onSubmit")
    if (this.isEditing) {
      this.onUpdate()
    } else {
      this.onCreate()
    }
  }

  onCreate() {
    console.log("onCreate")
    // Crear Documento nuevo 
    this.documentService.addDocument(this.document);
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

  onDelete(){

  }
}
