import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Category } from '../models/category.model';
import { Document } from '../models/document.model';
import { DocumentService } from '../services/document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { CategoryService } from '../services/category.service';

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
  categoryId: number = 0

  // @ViewChild('categorySel') categorySel
  
  @Input() editingDocumentId: Number = null
  @Output() resetEditingDocId: EventEmitter<any> = new EventEmitter<any>();

  document: Document = {
    id: null,
    description: '',
    amount: 0,
    date: new Date(),
    category: null
  }
  originalDocument: Document = {
    id: null,
    description: '',
    amount: 0,
    date: new Date(),
    category: null
  }

  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoryService) { }

  ngOnInit(): void {
    //  Leer categorias desde servicio
    this.categoriesService.categoryListChangedEvent.subscribe(cat => {
      // console.log(cat)
      this.categories = cat
    })
    this.categoriesService.getCategories()
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
    if (this.isEditing) {
      this.onUpdate()
    } else {
      this.onCreate()
    }
  }

  onCreate() {
    // Crear Documento nuevo 
    this.document.date = new Date(this.viewDate.split('-').join('/'))
    // console.log(this.document)

    this.document.category = this.categories.find(o => o.id == this.categoryId )
    this.documentService.addDocument(this.document)
    this.resetDocument()
  }

  onEdit(id) {
    // Cargar datos del documento que estamos editando
    // Actualizar el titulo
    this.title = 'Edit Expense'
    this.btnText = 'Update expense'
    console.log(this.documentService.getDocument(id))
    
    this.document = this.documentService.getDocument(id)
    this.categoryId = this.document.category.id 
    this.originalDocument = this.documentService.getDocument(id)
    this.viewDate = moment(this.document.date).format('YYYY-MM-DD')
  }

  onUpdate() {
    // Guardar documento creado usando el servicio
    this.document.date = new Date(this.viewDate.split('-').join('/'))
    this.documentService.updateDocument(this.originalDocument, this.document)
    this.resetDocument()
    // Reset Component to initial state
    this.resetForm()
  }

  onDelete() {
    // console.log(this.document)
    this.documentService.deleteDocument(this.document)
    this.resetDocument()
    // Reset Component to initial state
    this.resetForm()
  }

  resetDocument() {
    // Fill with blanks the current Document. AKA new Document
    this.document = {
      id: null,
      description: '',
      amount: 0,
      date: new Date(),
      category: null
    }
    this.categoryId = 0
  }

  resetForm() {
    // Reset originalDocument just here
    this.originalDocument = {
      id: null,
      description: '',
      amount: 0,
      date: new Date(),
      category: null
    }
    this.categoryId = 0

    this.isEditing = false
    this.title = 'Add Expense'
    this.btnText = 'Save expense'
    // this.editingDocumentId = null
    this.resetEditingDocId.emit()
  }
}
