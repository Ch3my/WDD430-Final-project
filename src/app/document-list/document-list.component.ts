import { Component, OnInit, Input } from '@angular/core';
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
  totalExpenses: Number = 0
  // documents: Document[] = [{
  //   id: 1,
  //   description: 'Expense Description',
  //   amount: 2,
  //   date: new Date()
  // }]
  documents: Document[] = []
  subscription: Subscription
  @Input() editingDocumentId: Number = 0;

  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documentsList: Document[]) => {
      this.documents = documentsList
    })
    // No asignamos la variable directo sino a traves de la subscripcion 
    this.documentService.getDocuments()
    // TODO. Sumar todos los gastos y agregar a variable
  }

  onClickExpense(e, id) {
    e.preventDefault()
    // console.log("Click Expense")
    console.log(id)

    // TODO. Open / pass data to document-edit
    // this.router.navigate([`/documents/${id}`]);
  }

}
