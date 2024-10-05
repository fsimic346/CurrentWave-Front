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

  async getDesigns(params: {
    count?: number;
    searchTerm?: string;
    category?: string;
    type?: string;
  }): Promise<Design[]> {
    let designQuery = query(
      collection(this.firestore, 'designs'),
      orderBy('createdAt', 'desc')
    );

    if (params.searchTerm) {
      designQuery = query(
        designQuery,
        where('name', '>=', params.searchTerm),
        where('name', '<=', params.searchTerm + '\uf8ff')
      );
    }

    if (params.count) {
      designQuery = query(designQuery, limit(params.count));
    }

    if (params.category) {
      designQuery = query(
        designQuery,
        where('category', '==', params.category)
      );
    }

    if (params.type) {
      designQuery = query(designQuery, where('type', '==', params.type));
    }

    const designSnapshot = await getDocs(designQuery);
    const designs: Design[] = [];

    designSnapshot.forEach((doc) => {
      designs.push({ id: doc.id, ...doc.data() } as Design);
    });

    return designs;
  }
}
