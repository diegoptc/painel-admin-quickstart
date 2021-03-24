import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoadingService } from 'src/services/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'painel-administrativo';
  loading = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private cd: ChangeDetectorRef,
    private loadingService: LoadingService,
  ) {
    this.loadingService.loading.subscribe((event: boolean) => {
      this.loading = event;
      this.cd.detectChanges();
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
