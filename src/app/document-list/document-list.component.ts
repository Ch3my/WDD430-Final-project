import { Component, OnInit } from '@angular/core';
import { Document } from '../models/document.model';
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

  documents: Document[] = [{
    id: 1,
    description: 'Expense Description',
    amount: 2,
    date: new Date()
  }]

  constructor() { }

  ngOnInit(): void {
    // Obtener lista de documentos desde API??
    // TODO. Leer desde Servicio
    // TODO. Sumar todos los gastos y agregar a variable

  }

  onClickExpense(e) {
    e.preventDefault()
    console.log("Click Expense")
    // TODO. Open / pass data to document-edit
  }

}
