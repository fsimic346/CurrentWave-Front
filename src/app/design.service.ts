import { inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from '@angular/fire/firestore';
import { Design } from '../models/design';

@Injectable({
  providedIn: 'root',
})
export class DesignService {
  firestore = inject(Firestore);

  constructor() {}

  async getDesign(id: string): Promise<Design> {
    const snapshot = await getDoc(doc(this.firestore, 'designs/' + id));
    return snapshot.data() as Design;
  }

  async getDesigns(
    pageSize: number,
    startAfterDoc: any = null,
    searchTerm: string = ''
  ): Promise<{ designs: Design[]; lastDoc: any }> {
    let designQuery = query(
      collection(this.firestore, 'designs'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );

    if (searchTerm) {
      designQuery = query(
        designQuery,
        where('name', '>=', searchTerm),
        where('name', '<=', searchTerm + '\uf8ff')
      );
    }

    if (startAfterDoc) {
      designQuery = query(designQuery, startAfter(startAfterDoc));
    }

    const designSnapshot = await getDocs(designQuery);
    const designs: Design[] = [];
    let lastDoc = null;

    designSnapshot.forEach((doc) => {
      designs.push({ id: doc.id, ...doc.data() } as Design);
    });

    lastDoc = designSnapshot.docs[designSnapshot.docs.length - 1];

    return { designs, lastDoc };
  }
}
