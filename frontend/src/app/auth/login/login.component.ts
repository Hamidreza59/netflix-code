import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService,
    private uiService: UIService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.authService.loginUser({
      "email": form.value.email,
      "password": form.value.password
    })
  }

}
