import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../models/document.model';
import { DocumentService } from '../services/document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  // pass moment to the view
  moment: any = moment;
  totalExpenses: number = 0
  // documents: Document[] = [{
  //   id: 1,
  //   description: 'Expense Description',
  //   amount: 2,
  //   date: new Date()
  // }]
  documents: Document[] = []
  subscription: Subscription
  // @Input() editingDocumentId: Number = 0;
  @Output() selectedDocument: EventEmitter<any> = new EventEmitter<number>();

  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documentsList: Document[]) => {
      this.documents = documentsList
      this.totalExpenses = 0
      // Sumar todos los gastos y agregar a variable
      for (let d of this.documents) {
        this.totalExpenses = this.totalExpenses + d.amount
      }
    })
    // No asignamos la variable directo sino a traves de la subscripcion 
    this.documentService.getDocuments()
  }

  onClickExpense(e, id) {
    e.preventDefault()
    // console.log(id)
    // TODO. Open / pass data to document-edit
    this.selectedDocument.emit(id)
  }

}
