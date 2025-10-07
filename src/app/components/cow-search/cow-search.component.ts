
import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cow } from '../../models/cow.model';

import { CowService } from '../../services/cow.service';

@Component({
  selector: 'app-cow-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cow-search.component.html',
  styleUrls: ['./cow-search.component.scss']
})

export class CowSearchComponent {
  @Output() filterChange = new EventEmitter<Cow[]>();

  filters : Cow[] = [];
  tag = '';
  status: string | null = null;
  pen = '';
  statusOptions = [
    { label: 'All Status', value: null },
    { label: 'Active', value: 'Active' },
    { label: 'In Treatment', value: 'In Treatment' },
    { label: 'Deceased', value: 'Deceased' }
  ];

  constructor(private cowService: CowService) {}

  applyFilters() {
    this.filters = this.cowService.filterCows(this.tag, this.status, this.pen);
    this.filterChange.emit(this.filters);
  }
}
