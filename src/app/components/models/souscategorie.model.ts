/*import { Categorie } from "./categorie.model";

export class Souscategorie {
    idsouscategorie? : any;
    nomsouscategorie? : string;
    imagesouscategorie? : string;
    nomcat?: string;
   // idcategorie? : any;
  categorie? : Categorie = {idcategorie:"", nomcategorie:"", imagecategorie:""};


}
*/

import { Categorie } from "./categorie.model";
export class Souscategorie {
  idsouscategorie?: number;
  nomsouscat?: string;
  description?: string;
  imageUrl?: File;
  categoryId?: number;
  nomcategorie?: string;
  category? : Categorie = { nomcategorie:"", description:"" };
}

