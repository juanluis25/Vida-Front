import { RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from './componentes/persona/persona.component'
import { VerPersonasComponent } from './componentes/ver-personas/ver-personas.component';
import { HomeComponent } from './componentes/home/home.component';
import { EditarPersonasComponent } from './componentes/editar-personas/editar-personas.component';
import { NgModule } from '@angular/core';
import { OracionDeFeComponent } from './componentes/oracion-de-fe/oracion-de-fe.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'persona', component: PersonaComponent},
    { path: 'ver-personas', component: VerPersonasComponent},
    { path: 'editar-persona/:id', component: EditarPersonasComponent },
    { path: 'oracion-de-fe/:id', component: OracionDeFeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}