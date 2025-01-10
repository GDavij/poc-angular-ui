import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { MembersComponent } from './features/members/members.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'members',
                component: MembersComponent
            }
        ]
    }
];
