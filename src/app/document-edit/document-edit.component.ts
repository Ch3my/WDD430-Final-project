import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Category } from '../models/category.model';
import { Document } from '../models/document.model';
import { DocumentService } from '../services/document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit, OnChanges {
  categories: Category[] = []
  title: String = 'Add Expense'
  btnText: String = 'Save expense'
  isEditing: boolean = false
  viewDate: string = moment().format('YYYY-MM-DD')

  @Input() editingDocumentId: Number = null

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

  ngOnChanges(changes: SimpleChanges) {
    // Se ejecuta cada vez que actualizan en valor de @Input
    // console.log(changes.editingDocumentId.currentValue)
    if (changes.editingDocumentId.currentValue) {
      this.onEdit(changes.editingDocumentId.currentValue)
      this.isEditing = true
    }
  }

  onSubmit() {
    // Se ejecuta desde el boton
    // llama a onCreate si es nuevo y onUpdate
    // cuando editan un documento
    // console.log("onSubmit")
    if (this.isEditing) {
      this.onUpdate()
    } else {
      this.onCreate()
    }
  }

  onCreate() {
    // Crear Documento nuevo 
    // console.log(this.document)
    this.document.date = new Date(this.viewDate.split('-').join('/'))
    // console.log(this.viewDate)
    // console.log(this.document)

    this.documentService.addDocument(this.document);
  }

  onEdit(id) {
    // TODO. Cargar datos del documento que estamos editando
    // Actualizar el titulo
    this.title = 'Edit Expense'
    this.btnText = 'Update expense'
    // console.log(this.documentService.getDocument(id))

    this.document = this.documentService.getDocument(id)
    this.viewDate = moment(this.document.date).format('YYYY-MM-DD')
  }

  onUpdate() {
    // TODO. Guardar documento creado usando el servicio
  }

  onDelete() {

  }
}
