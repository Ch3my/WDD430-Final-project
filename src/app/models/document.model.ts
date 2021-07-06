import { Category } from "./category.model";

export class Document {
    constructor(public id: number,
        public description: string,
        public amount: number,
        public date: Date,
        public category?: Category
    ) {
    }
}