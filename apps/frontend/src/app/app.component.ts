import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'campuscalendar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  providers: [TranslateService],
  imports: [
    RouterOutlet,
   
  ],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  private translate = inject(TranslateService);
  private primeNGConfig = inject(PrimeNGConfig);

  ngOnInit(): void {
    this.translate.use('fr');
    this.translate.setDefaultLang('fr');
    this.translate.addLangs(['fr', 'en']);
    this.translate.stream('primeng').subscribe((res) => {
      this.primeNGConfig.setTranslation(res);
    });
    this.primeNGConfig.setTranslation;
  }
}
