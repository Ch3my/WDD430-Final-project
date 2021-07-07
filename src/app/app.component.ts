import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final';
  editingDocumentId: number = null

  selectedDocument(id) {
    console.log("Parent " + id)
    // Mostrar Document edit en EditMode
    // pasar id a document-edit
    this.editingDocumentId = id
  }
}
