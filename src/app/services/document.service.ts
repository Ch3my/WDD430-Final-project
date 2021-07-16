import { EventEmitter, Injectable } from '@angular/core';
import { Document } from '../models/document.model';
import { Subject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    documents: Document[] = []
    maxDocumentId: number

    documentListChangedEvent = new Subject<Document[]>()

    constructor(private http: HttpClient) { }

    getMaxId(): number {
        let maxId = 0
        for (let d of this.documents) {
            let currentId = d.id
            if (currentId > maxId) {
                maxId = currentId
            }
        }
        return maxId
    }

    getDocuments() {
        this.http.get<Document[]>('http://localhost:3000/documents').subscribe(
            // success method
            (documents: Document[]) => {
                this.documents = documents
                this.maxDocumentId = this.getMaxId()
                // sort the list of documents
                this.documents.sort((a, b) => {
                    if (a.date > b.date) {
                        return 1;
                    }
                    if (b.date > a.date) {
                        return -1;
                    }
                    return 0;
                })
                // emit the next document list change event
                this.documentListChangedEvent.next(this.documents.slice());
            }, (error: any) => {
                console.log(error);
            })
    }

    addDocument(newDocument: Document) {
        if (!newDocument) {
            return
        }
        this.maxDocumentId++
        newDocument.id = this.maxDocumentId

        console.log(newDocument)

        this.http.post('http://localhost:3000/documents/', newDocument)
            .subscribe(
                (response: { message: string, document: Document }) => {
                    // this.documents.push(response.document)
                    // this.documentListChangedEvent.next(this.documents.slice());
                    this.getDocuments()
                });

    }

    getDocument(id: number): Document {
        // Se asegura de tener la lista llena
        // this.getDocuments()
        // return this.http.get<Document>('http://localhost:3000/documents/' + id)

        // Convierte el date string en tipo Date
        var doc = this.documents.find(o => o.id == id)
        doc.date = new Date(doc.date)
        return doc
    }

    deleteDocument(document: Document) {
        if (!document) {
            return
        }
        const pos = this.documents.findIndex(d => d.id === document.id);

        if (pos < 0) {
            return
        }
        // this.documents.splice(pos, 1)
        // let documentsListClone = this.documents.slice()
        // this.documentListChangedEvent.next(documentsListClone)
        // this.storeDocuments()

        this.http.delete('http://localhost:3000/documents/' + document.id)
            .subscribe(
                (response: Response) => {
                    this.documents.splice(pos, 1);
                    this.documentListChangedEvent.next(this.documents.slice());
                    // this.sortAndSend();
                    // Update Client?
                });
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) {
            return
        }
        let pos = this.documents.indexOf(originalDocument)
        if (pos < 0) {
            return
        }
        newDocument.id = originalDocument.id
        this.documents[pos] = newDocument
        this.http.put('http://localhost:3000/documents/' + originalDocument.id, newDocument)
            .subscribe(
                (response: Response) => {
                    this.documents[pos] = newDocument;
                    // this.contacts.push(response.contact)
                    this.documentListChangedEvent.next(this.documents.slice());
                });
    }
}