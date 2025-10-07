
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cow } from '../models/cow.model';

@Injectable({ providedIn: 'root' })
export class CowService {
  private cowsSubject = new BehaviorSubject<Cow[]>([]);
  cows$ = this.cowsSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('cows');
    this.cowsSubject.next(stored ? JSON.parse(stored) : []);
  }

  addCow(cow: Cow) {
    cow.lastEventDate = cow.events?.[0]?.date || new Date();
    const updated = [...this.cowsSubject.value, cow];
    this.cowsSubject.next(updated);
    localStorage.setItem('cows', JSON.stringify(updated));
  }

  get currentCows(): Cow[] {
    return this.cowsSubject.getValue();
  }

  getCowById(id: string): Cow | undefined {
    return this.cowsSubject.value.find(cow => cow.id === id);
  }

  // Optionally, for filtering/searching/advance search:
  filterCows(tag?: string, status?: string, pen?: string): Cow[] {
    return this.cowsSubject.value.filter(cow => {
      let stat = status === 'null' ? null : status;
      const tagMatch = !tag || cow.id.toLowerCase().includes(tag.toLowerCase());
      const statusMatch = !stat || cow.status === stat;
      const penMatch = !pen || cow.pen.toLowerCase().includes(pen.toLowerCase());
      return tagMatch && statusMatch && penMatch;
    });
}

}
