import { Marque } from "./marque.model";
import { Souscategorie } from "./souscategorie.model";
import { Categorie } from "./categorie.model";
export class Produit {
    id?: number;
    name? : string;
    codeBarre? : string;
    imageURL?: File;
    prix_de_ventee?: number;
    description? : string;
    unite? : string;
    qte?: number;
    available?: boolean;

    idmarque? : number;
    nomMarque? : string;
    marques? : Marque = {nommarque :""};

    categoryName?: string;
    categories? : Categorie = { nomcategorie:"", description:"" };
    idsouscategorie?: number;
    subcategoryName?: string;
    souscategories? : Souscategorie = {nomsouscat : ""};
}


