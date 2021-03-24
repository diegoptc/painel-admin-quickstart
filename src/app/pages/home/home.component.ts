import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
}
