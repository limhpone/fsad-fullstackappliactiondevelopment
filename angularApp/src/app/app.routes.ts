import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { StudentsCreateComponent } from './students/students-create/students-create.component';
import { StudentsEditComponent } from './students/students-edit/students-edit.component';
import { LoginComponent } from './login/login.component';
import { verifyJWTToken } from './middleware/auth.guard';
import { RealtimeComponent } from './realtime/realtime.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {
        path: '',
        component: StudentsEditComponent,
    },
    {
        path: 'chat',
        component: RealtimeComponent,
        canActivate: [verifyJWTToken],
    },
    {
        path: 'projects',
        component: ProjectComponent,
        canActivate: [verifyJWTToken],
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }

];
