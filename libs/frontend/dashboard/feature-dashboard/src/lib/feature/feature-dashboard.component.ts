import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'campuscalendar-feature-dashboard',
  standalone: true,
  imports: [CommonModule, AvatarModule, ButtonModule, DividerModule, RouterModule, SidebarModule],
  templateUrl: './feature-dashboard.component.html',
  styleUrls: ['./feature-dashboard.component.scss'],
})
export class FeatureDashboardComponent {
  sidebarVisible = false;


}
