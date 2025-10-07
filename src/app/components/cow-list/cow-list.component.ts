
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CowService } from '../../services/cow.service';
import { Cow } from '../../models/cow.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CowSearchComponent } from '../cow-search/cow-search.component';

@Component({
  selector: 'app-cow-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, InputTextModule, ButtonModule, CowSearchComponent],
  templateUrl: './cow-list.component.html',
  styleUrls: ['./cow-list.component.scss']
})
export class CowListComponent {
  cows: Cow[] = [];
  allCows: Cow[] = [];
  tag = '';
  status: string | null = null;
  pen = '';
  statusOptions = [
    { label: 'All Status', value: null },
    { label: 'Active', value: 'Active' },
    { label: 'In Treatment', value: 'In Treatment' },
    { label: 'Deceased', value: 'Deceased' }
  ];

  constructor(private cowService: CowService, private router: Router) {
    this.cowService.cows$.subscribe(list => {
      this.allCows = list;
      this.cows = list;
    });
  }

  onFilter(filteredCows: Cow[]) {
    this.cows = filteredCows;
  }

  viewCow(cow: Cow | Cow[] | any) {
    console.log(cow);
    // PrimeNG selection events may sometimes pass an array depending on configuration.
    if (Array.isArray(cow)) {
      cow = cow.length ? cow[0] : undefined;
    }
    if (cow && (cow as Cow).id) {
      this.router.navigate(['/detail', (cow as Cow).id]);
    }
  }

  goToAddCow() { this.router.navigate(['/add']); }
}
