// Interface = la forme d'un objet Lot (comme une classe mais sans logique)
// Ça permet à TypeScript de vérifier qu'on manipule les bons champs

export interface Lot {
  id?: number;               // optionnel (généré par la DB)
  idRace: number;
  quantite: number;
  date_enregistrement: string;  // format "YYYY-MM-DD"
  age: number;
  PA: number;                // prix d'achat
}
