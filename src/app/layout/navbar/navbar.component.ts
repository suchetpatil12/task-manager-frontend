import { Component } from '@angular/core';

import { ThemeService } from '../../services/theme.service';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterLink,
  NavigationEnd
} from '@angular/router';

import { filter } from 'rxjs/operators';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';

import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../services/auth.service';
import { CreateProjectModalComponent } from '../../components/create-project-modal/create-project-modal.component';



@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule
  ],

  templateUrl: './navbar.component.html',

  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  showNavbar = true;

  constructor(

    public authService: AuthService,

    private router: Router,

    public themeService: ThemeService,

    private dialog: MatDialog

  ) {

    this.router.events

      .pipe(
        filter(event =>
          event instanceof NavigationEnd
        )
      )

      .subscribe(() => {

        this.showNavbar =

          this.router.url !== '/login' &&
          this.router.url !== '/';

      });

  }

   // ✅ CHECK LOGIN
  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }

  // ✅ CHECK AUTH PAGE
  isAuthPage(): boolean {

    return this.router.url === '/auth';

  }

  // THEME

  toggleTheme() {

    this.themeService.toggleTheme();

  }


  // LOGOUT

  logout() {

    this.authService.logout();

    this.router.navigate(['/auth']);

  }

  // OPEN CREATE PROJECT MODAL

  openCreateProjectModal(): void {

    const dialogRef = this.dialog.open(

      CreateProjectModalComponent,

      {

        width: '560px',

        panelClass: 'custom-dialog-container'

      }

    );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          window.location.reload();

        }

      });

  }

}