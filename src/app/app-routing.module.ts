import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProjectComponent } from "./components/project/project.component";
import { NewsComponent } from "./components/news/news.component";
const appRoutes: Routes = [
    { path: "dashboard", component: DashboardComponent },
    { path: "projects", component: ProjectComponent },
    { path: "news", component: NewsComponent },
    { path: "", redirectTo: "dashboard", pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}