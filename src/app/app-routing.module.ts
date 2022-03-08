import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren:() => import("./pages/home/home.module").then((m) => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import("./pages/auth/auth.module").then((m) => m.AuthModule),
    data: { showHeader: false, showFooter: false },
  },
  {
    path: 'countries',
    loadChildren: () => import("./pages/countries/countries.module").then((m) => m.CountriesModule),
    canActivate: [AuthGuard]
  },
  {
    path: "cities",
    loadChildren: () => import("./pages/cities/cities.module").then((m) => m.CitiesModule),
    canActivate: [AuthGuard]
  },
  {
    path: "404",
    component: NotFoundComponent
  },
  {
    path: "**",
    redirectTo: "404"
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
