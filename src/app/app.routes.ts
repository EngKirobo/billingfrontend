import { BookpayComponent } from './hostel/components/bookpay/bookpay';
import { StudentsComponent } from './student/components/students/students';
import { PriceComponent } from './hostel/components/price/price';
import { Component } from '@angular/core';
import { Register } from './features/auth/register/register';
import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';   // ← Import here
import { UserDashboard } from './user-dashboard/user-dashboard';
import { AdminUsers } from './admin-users/admin-users';
import { adminGuard } from './guards/admin-guard';
import { RolePermissions } from './components/role-permissions/role-permissions';
import { Admindashboard } from './components/admindashboard/admindashboard';
import { IntakeComponent } from './hostel/components/intake/intake';
import { HostelComponent } from './hostel/components/hostel/hostel';
import { HostelDetailComponent } from './hostel/components/hosteldetail/hosteldetail';
import { ProgramComponent } from './student/components/program/program';
import { DepartmentComponent } from './student/components/department/department';
import { AssignroomsComponent } from './hostel/components/assignrooms/assignrooms';
import { HostelBookingComponent } from './hostel/components/hostelbooking/hostelbooking';
import { PaymentComponent } from './hostel/components/hostelpayment/hostelpayment';
// import { RegisterComponent } from './features/auth/register/register';
import { loginGuard } from './guards/login-guard';
import { AutomationComponent } from './hostel/components/automation/automation';
// app.routes.ts (or admin.routes.ts)
import { HostelDashboard } from './hostel/components/hostel-dashboard/hostel-dashboard';


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
 {
   path:'login',
  component: Login,
  canActivate: [loginGuard]

  },
 {path: 'register',component: Register},
//  {path: 'prices',component: PriceComponent},
//  {path: 'intakes',component: IntakeComponent},
//  {path: 'hostels',component: HostelComponent},
//  {path: 'hosteldetails',component: HostelDetailComponent},
//  {path: 'assignrooms',component: AssignroomsComponent},
//  {path: 'hostelbookings',component: HostelBookingComponent},
//  {path: 'hostelpays',component:PaymentComponent},
//  {path: 'bookpays', component: BookpayComponent,canActivate: [adminGuard] },
//  {path: 'automation',component: AutomationComponent},
//  {path: 'students',component: StudentsComponent},
//  {path: 'programs',component: ProgramComponent},
//  {path: 'departments',component: DepartmentComponent},


{
    path: 'hosteldashboard',
    component: HostelDashboard,
    children: [

      { path: 'prices', component: PriceComponent },
      { path: 'intakes', component: IntakeComponent },
      { path: 'hostels', component: HostelComponent },
      { path: 'hosteldetails', component: HostelDetailComponent },
      { path: 'assignrooms', component: AssignroomsComponent },
      { path: 'hostelbookings', component: HostelBookingComponent },
      { path: 'hostelpays', component: PaymentComponent },

      {
        path: 'bookpays',
        component: BookpayComponent,
        canActivate: [adminGuard]
      },

      { path: 'automation', component: AutomationComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'programs', component: ProgramComponent },
      { path: 'departments', component: DepartmentComponent },

      {
        path: '',
        redirectTo: 'hostels',
        pathMatch: 'full'
      }
    ]
  },

 {path: 'dashboard',component:UserDashboard},
 ...adminRoutes,
 // Default redirect
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
//  {path: 'admindashboard',component:Admindashboard},
// {path: 'adminroles',component:AdminUsers, canActivate: [adminGuard] },
// {path: 'permissions',component:RolePermissions, canActivate: [adminGuard] }

// {
//   path: 'adminroles',
//   loadComponent: () => import('./admin-users/admin-users').then(m => m.AdminUsers),
//   canActivate: [adminGuard]   // ✅ ADD THIS
// }


];
