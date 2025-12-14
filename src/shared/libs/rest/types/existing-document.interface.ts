export interface ExistingDocument {
  exists(documentId: string): Promise<boolean>;
}
