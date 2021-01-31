import { Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService
  ) { }

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoadingState => {
      this.isLoading = isLoadingState;
    });   
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  } 

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      "name": form.value.name,
      "email": form.value.email,
      "password": form.value.password
    })
  }
}
