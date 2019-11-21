import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent}  from './pages/login/login.component';
import {HomeComponent}  from './pages/home/home.component';
import {RegistroComponent}  from './pages/registro/registro.component';
import {NavbarComponent}  from './components/navbar/navbar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
            { path: 'home', component: HomeComponent },
                        { path: 'navbar', component: NavbarComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
