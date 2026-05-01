import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user';
import { RoleService, Role, Permission } from '../services/role';


import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../core/services/auth.service'; // ✅ ADD THIS

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers implements OnInit {
  users: any[] = [];

  // Example roles (match your DB)
  // roles = [
  //   { id: 1, name: 'ADMIN' },
  //   { id: 7, name: 'ADMIN2' },
  // ];

loudroles: Role[] = [];

  // ✅ permission flags
  canViewUsers = false;
  canUpdateUsers = false;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private authService: AuthService, // ✅ INJECT
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadRoles();
    // ✅ check permissions from JWT
    this.canViewUsers = this.authService.hasPermission('USER_READ');
    this.canUpdateUsers = this.authService.hasPermission('USER_UPDATE');

    // ✅ only load if allowed
    if (this.canViewUsers) {
      this.loadUsers();
    } else {
      console.warn('No permission to view users');
    }
  }


    loadRoles() {
    this.roleService.getRoles().subscribe((res) => {
      this.loudroles = res;
      this.cdr.detectChanges();
    });


  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        console.log('USERS:', res);
        this.users = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  changeRole(userId: number, roleId: any) {
    // ✅ block action if no permission
    if (!this.canUpdateUsers) {
      alert('You are not allowed to update roles');
      return;
    }

    this.userService.updateUserRole(userId, Number(roleId)).subscribe({
      next: () => {
        alert('Role updated successfully');
        this.loadUsers();
      },
      error: (err) => console.error(err),
    });
  }
}
