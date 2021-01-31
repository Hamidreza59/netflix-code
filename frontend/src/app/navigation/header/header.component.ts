import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;
  authSubscription: Subscription;
  @Output() sideNavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
        this.isAuth = authStatus;
    });
  }

  onToggleSidenav() {
    this.sideNavToggle.emit();
}

  onLogout() {
    this.authService.logout();
  }

}
