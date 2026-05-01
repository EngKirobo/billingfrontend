import { Component, OnInit } from '@angular/core';
import { RoleService, Role, Permission } from '../../services/role';
import { ChangeDetectorRef } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-permissions',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './role-permissions.html',
  styleUrl: './role-permissions.css',
})
export class RolePermissions implements OnInit {
  roles: Role[] = [];
  permissions: Permission[] = [];

  selectedRoleId!: number;
  selectedPermissions: number[] = [];

  constructor(
    private roleService: RoleService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadRoles();
    this.loadPermissions();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe((res) => {
      this.roles = res;
      this.cdr.detectChanges();
    });


  }

  loadPermissions() {
    this.roleService.getPermissions().subscribe((res) => {
      this.permissions = res;
      this.cdr.detectChanges();
    });
  }

  onRoleChange() {
    const role = this.roles.find((r) => r.id == this.selectedRoleId);
    this.selectedPermissions = role?.permissions.map((p) => p.id) || [];
  }

  togglePermission(permissionId: number) {
    if (this.selectedPermissions.includes(permissionId)) {
      this.selectedPermissions = this.selectedPermissions.filter((id) => id !== permissionId);
    } else {
      this.selectedPermissions.push(permissionId);
    }
  }

  updatePermissions() {
    this.roleService
      .updateRolePermissions(this.selectedRoleId, this.selectedPermissions)
      .subscribe({
        next: () => alert('Permissions updated'),
        error: (err) => console.error(err),
      });
  }
}
