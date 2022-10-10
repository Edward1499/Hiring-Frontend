import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./pages/main/main.component";
import { PositionDetailComponent } from "./pages/position-detail/position-detail.component";
import { PositionComponent } from "./pages/position/position.component";
import { ProfileComponent } from "./pages/profile/profile.component";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
           { path: 'mi-perfil', component: ProfileComponent },
           { path: 'posiciones', component: PositionComponent },
           { path: 'posicion/:id', component: PositionDetailComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ClientRoutingModule {}