import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddPositionComponent } from "./pages/add-position/add-position.component";
import { CompetitionComponent } from "./pages/competition/competition.component";
import { DepartmentComponent } from "./pages/department/department.component";
import { EmployeeComponent } from "./pages/employee/employee.component";
import { HireComponent } from "./pages/hire/hire.component";
import { LanguageComponent } from "./pages/language/language.component";
import { MainComponent } from "./pages/main/main.component";
import { PositionComponent } from "./pages/position/position.component";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
           { path: 'competencias', component: CompetitionComponent },
           { path: 'departamentos', component: DepartmentComponent },
           { path: 'idiomas', component: LanguageComponent },
           { path: 'posiciones', component: PositionComponent },
           { path: 'agregar-posicion', component: AddPositionComponent },
           { path: 'editar-posicion/:id', component: AddPositionComponent },
           { path: 'contratar/:positionId/:candidateId', component: HireComponent },
           { path: 'empleados', component: EmployeeComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule {}