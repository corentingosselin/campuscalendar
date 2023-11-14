import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'campuscalendar-step-personal-info',
  standalone: true,
  imports: [InputTextModule, ButtonModule],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoComponent {
  private router = inject(Router);

  public nextPage() {
    console.log('nextPage');
    this.router.navigate(['setup/school']);
  }
}
