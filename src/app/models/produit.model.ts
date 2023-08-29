import { Marque } from "./marque.model";
import { Souscategorie } from "./souscategorie.model";
import { Categorie } from "./categorie.model";
export class Produit {
    code?: number;
    name? : string;
    codebarre? : string;
    imageURL?: File;
    prix_de_vente?: number;
    description? : string;
    unite? : string;
    qte?: number;
    available?: boolean;

    idmarque? : number;
    nommarque? : string;
    marque? : Marque = {nommarque :""};

    nomcategorie?: string;
    categories? : Categorie = { nomcategorie:"", description:"" };
    idsouscategorie?: number;
    nomsouscat?: string;
    sosucategories? : Souscategorie = {nomsouscat : ""};
}


