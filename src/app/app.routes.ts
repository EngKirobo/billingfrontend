import { GenerateBillsComponent } from './hostel/components/generate-bills/generate-bills';
import { RoomsComponent } from './hostel/components/room/room';
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
import { RoomstointakeComponent } from './hostel/components/roomstointake/roomstointake';
import { Bookinghostel } from './hostel/components/bookinghostel/bookinghostel';
import { ControlNumberComponent } from './hostel/components/controlnumber/controlnumber';
import { StudentFormComponent } from './student/components/student-form/student-form';
import { CourseComponent } from './shortcourse/components/course/course';
import { CourseintakeComponent } from './student/components/courseintake/courseintake';
import { CoursebookingComponent } from './student/components/coursebooking/coursebooking';
import { KozpaymentComponent } from './student/components/kozpayment/kozpayment';
import { KozpaysdetailsComponent } from './student/components/kozpaysdetails/kozpaysdetails';
import { Studentdashbod } from './student/components/studentdashbod/studentdashbod';
import { KozstudentComponent } from './student/components/kozstudent/kozstudent';


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

 { path: 'kozdashboard', component: Studentdashbod,
         children: [

      { path: 'courses', component: CourseComponent },
      { path: 'courseintake', component: CourseintakeComponent},
      { path: 'kozstudents', component: KozstudentComponent},
      { path: 'coursebookings', component: CoursebookingComponent},
      { path: 'kozpayments', component:KozpaymentComponent},
      { path: 'kozpaydatails', component:KozpaysdetailsComponent},]
 },
{
    path: 'hosteldashboard',
    component: HostelDashboard,
    children: [


      { path: 'entryform', component:StudentFormComponent},
      { path: 'prices', component: PriceComponent },
      { path: 'intakes', component: IntakeComponent },
      { path: 'hostels', component: HostelComponent },
      { path: 'hosteldetails', component: HostelDetailComponent },
      {path:'generatebills',component:GenerateBillsComponent},
      { path: 'rooms', component: RoomsComponent},
      {path:'roomsintake',component:RoomstointakeComponent},
      { path: 'assignrooms', component: AssignroomsComponent },
      { path: 'hostelbookings', component: HostelBookingComponent },
      { path: 'bookinghoste', component: Bookinghostel},
      { path: 'hostelpays', component: PaymentComponent },
      { path: 'ctn', component: ControlNumberComponent},
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
