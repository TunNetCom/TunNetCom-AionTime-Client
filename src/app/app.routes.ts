import { Routes } from '@angular/router';
import { authGuard } from './Service/Guard/auth.guard';

export const routes: Routes = [
    {
        path:'main',
        loadComponent:()=>import('./home/home.component').then(c=>c.HomeComponent)
    },
    {
        path:'',
        loadComponent:()=>import('./main/dashbord/dashbord.component').then(c=>c.DashbordComponent),canActivate:[authGuard],
        children: [
            {path:'',loadComponent:()=>import('./main/main-component/body/body.component').then(c =>c.BodyComponent)}
        ]
    }
];
