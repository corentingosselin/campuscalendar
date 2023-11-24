import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@campuscalendar/authentification-data-access';
import { AccountFacade } from '@campuscalendar/dashboard-data-access';
import { GlobalDialogService } from '@campuscalendar/dialog';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'campuscalendar-account-dialog',
  standalone: true,
  imports: [CommonModule, AvatarModule, ButtonModule, RouterModule],
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss'],
})
export class AccountDialogComponent {
  private authService = inject(AuthService);
  private accountFacade = inject(AccountFacade);

  accountInfo$ = this.accountFacade.accountState$;

  logout() {
    this.authService.logout();
    GlobalDialogService.closeCurrentDialog();
  }
}
