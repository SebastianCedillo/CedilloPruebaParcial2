import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
// import { usuariosGuardGuard } from './Guards/usuarios-guard.guard';

const routes: Routes = [
  {
    path: '', // Root path
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent),
        // canActivate: [usuariosGuardGuard]
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      
     
      {
        path: 'habitaciones',
        loadComponent: () => import('./habitaciones/habitaciones.component').then((m) => m.HabitacionesComponent),
        // canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevahabitacion',
        loadComponent: () => import('./habitaciones/nuevahabitacion/nuevahabitacion.component').then((m) => m.NuevaHabitacionComponent),
        // canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarhabitacion/:id',
        loadComponent: () => import('./habitaciones/nuevahabitacion/nuevahabitacion.component').then((m) => m.NuevaHabitacionComponent),
        // canActivate: [usuariosGuardGuard]
      },
      {
        path: 'huespedes',
        loadComponent: () => import('./huespedes/huespedes.component').then((m) => m.HuespedesComponent),
        // canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevohuesped',
        loadComponent: () => import('./huespedes/nuevohuesped/nuevohuespedes.component').then((m) => m.NuevoHuespedComponent),
        // canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarhuesped/:id',
        loadComponent: () => import('./huespedes/nuevohuesped/nuevohuespedes.component').then((m) => m.NuevoHuespedComponent),
        // canActivate: [usuariosGuardGuard]
      },
      {
        path: 'reservas',
        loadComponent: () => import('./reservas/reservas.component').then((m) => m.ReservasComponent),
        // canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevareserva',
        loadComponent: () => import('./reservas/nuevareservas/nuevareserva.component').then((m) => m.NuevaReservaComponent),
        // canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarreserva/:id',
        loadComponent: () => import('./reservas/nuevareservas/nuevareserva.component').then((m) => m.NuevaReservaComponent),
        // canActivate: [usuariosGuardGuard]
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'login/:id?',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
