import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { MembersComponent } from './features/members/members.component';
import { EditComponent } from './features/members/edit/edit.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'members/edit/:id',
                component: EditComponent
            },
            {
                path: 'members/new',
                component: EditComponent
            },
            {
                path: 'members',
                component: MembersComponent
            },
        ]
    }
];
