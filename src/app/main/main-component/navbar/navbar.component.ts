import { Component, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../../Service/layout/layout.service';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from "../sidebar/sidebar.component";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, MenuModule, TieredMenuModule, ButtonModule, SidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'] // Corrected to 'styleUrls'
})
export class NavbarComponent {
  items: { nav?: any[]; account?: any[] } | undefined;
  constructor(private theme: LayoutService, private renderer: Renderer2) {
    this.items = {
      nav: [
        {
          label: 'Home',
          icon: 'pi pi-home'
        },
        {
          label: 'Features',
          icon: 'pi pi-star'
        },
        {
          label: 'Projects',
          icon: 'pi pi-search',
          items: [
            {
              label: 'Core',
              icon: 'pi pi-bolt',
              shortcut: '⌘+S'
            },
            {
              label: 'Blocks',
              icon: 'pi pi-server',
              shortcut: '⌘+B'
            },
            {
              label: 'UI Kit',
              icon: 'pi pi-pencil',
              shortcut: '⌘+U'
            },
            {
              separator: true
            },
            {
              label: 'Templates',
              icon: 'pi pi-palette',
              items: [
                {
                  label: 'Apollo',
                  icon: 'pi pi-palette',
                  badge: '2'
                },
                {
                  label: 'Ultima',
                  icon: 'pi pi-palette',
                  badge: '3'
                }
              ]
            }
          ]
        },
        {
          label: 'Notification',
          icon: 'pi pi-inbox',
          badge: '3',
          command: () => this.theme.applyTheme(this.renderer, true)
        }
      ],
      account: [
        {
          label: 'Account',
          icon: 'pi pi-user',
          items: [
            {
              label: 'Settings',
              icon: 'pi pi-cog',
            },
            {
              label: 'Messages',
              icon: 'pi pi-inbox',
              badge: '2'
            },
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
            }
          ]
        }
      ]
    };
  }
}
