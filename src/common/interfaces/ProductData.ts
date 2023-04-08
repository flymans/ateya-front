export interface ProductData {
  id?: string;
  pavilion: string;
  equipmentType: string;
  comment: string;
  responsible: string;
  previousValues?: { pavilion: string; responsible: string };
}
