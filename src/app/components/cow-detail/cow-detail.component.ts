
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CowService } from '../../services/cow.service';
import { Cow } from '../../models/cow.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-cow-detail',
  imports: [CommonModule, FormsModule,CardModule],
  templateUrl: './cow-detail.component.html',
  styleUrls: ['./cow-detail.component.scss']
})
export class CowDetailComponent implements OnInit {
  cow?: Cow;

  constructor(
    private route: ActivatedRoute,
    private cowService: CowService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cow = this.cowService.getCowById(id);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
