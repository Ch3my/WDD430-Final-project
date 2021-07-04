import { Category } from "./category.model";

export class Document {
    constructor(public id: Number,
        public description: string,
        public amount: Number,
        public date: Date,
        public category?: Category
    ) {
    }
}