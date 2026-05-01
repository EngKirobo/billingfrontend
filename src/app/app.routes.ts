import { Component } from '@angular/core';
import { Register } from './features/auth/register/register';
import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';   // ← Import here
import { UserDashboard } from './user-dashboard/user-dashboard';
import { AdminUsers } from './admin-users/admin-users';
import { adminGuard } from './guards/admin-guard';
import { RolePermissions } from './components/role-permissions/role-permissions';
import { Admindashboard } from './components/admindashboard/admindashboard';
// import { RegisterComponent } from './features/auth/register/register';

// app.routes.ts (or admin.routes.ts)

const adminRoutes: Routes = [
  {
    path: 'admin',                    // ← Master Route (Parent)
    component: Admindashboard,        // This will be the Master Layout
    canActivate: [adminGuard],        // Optional: Protect the whole admin section
    children: [                       // ← Child Routes
      {
        path: '',                     // Default child (when /admin is accessed)
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      // {
      //   path: 'dashboard',            // Child route → /admin/dashboard
      //   component: Admindashboard
      // },
      {
        path: 'users',                // Child route → /admin/users
        component: AdminUsers
      },
      {
        path: 'permissions',          // Child route → /admin/permissions
        component: RolePermissions
      }
    ]
  }
];

// // Then add it to your main routes
// export const routes: Routes = [
//   ...adminRoutes,
//   // other routes...
// ];


export const routes: Routes = [
 {path:'login',component: Login },
 {path: 'register',component: Register},
 {path: 'dashboard',component:UserDashboard},
 ...adminRoutes,
 // Default redirect
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
//  {path: 'admindashboard',component:Admindashboard},
// {path: 'adminroles',component:AdminUsers, canActivate: [adminGuard] },
// {path: 'permissions',component:RolePermissions, canActivate: [adminGuard] }

// {
//   path: 'adminroles',
//   loadComponent: () => import('./admin-users/admin-users').then(m => m.AdminUsers),
//   canActivate: [adminGuard]   // ✅ ADD THIS
// }


];
