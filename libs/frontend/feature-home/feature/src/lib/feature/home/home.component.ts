import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from '@campuscalendar/data-access';

@Component({
  selector: 'campuscalendar-feature-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  
  private testService = inject(TestService);

  ngOnInit(): void {
    this.testService.test();
  }


}
