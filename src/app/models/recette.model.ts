import { Produit } from "./produit.model";

export class Recette {
    id?: number;
    nomRecette? : string;
    description? : string;
    imageRecette?: File;
    products? : Produit[];
}