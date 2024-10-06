import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../main-component/navbar/navbar.component';
import { FooterComponent } from '../main-component/footer/footer.component';
import { BodyComponent } from '../main-component/body/body.component';
import { SidebarComponent } from "../main-component/sidebar/sidebar.component";

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, BodyComponent, SidebarComponent],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.scss'
})
export class DashbordComponent {

}
