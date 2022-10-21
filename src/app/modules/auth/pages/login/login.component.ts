import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription!: Subscription;
  public isHidePass: boolean = false;
  public loginForm!: FormGroup;
  public incorrect = false;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
  ) {
    this.buildForm();
  }

  ngAfterViewInit(): void {

    let observ1 = this.loginForm.get('email')?.valueChanges.subscribe(
      res => {
        if (this.incorrect) {
          this.incorrect = false;
        }
      }
    );

    let observ2 =this.loginForm.get('password')?.valueChanges.subscribe(
      res => {
        if (this.incorrect) {

          this.incorrect = false;
        }
      }
    );

    this.subscription?.add(observ1);
    this.subscription?.add(observ2);

  }

  ngOnInit(): void {}

  // show or hide password input control
  onToggleShowPass(): void {
    this.isHidePass = !this.isHidePass;
  }

  // login
  submitForm(event: Event) {
    if (this.loginForm.invalid) return;

    this.authService.nextStreem(true);
    const { email: username, password } = this.loginForm.value;

    let observ3 = this.authService
      .login({ username, password, clientID: '' })
      .subscribe((res) => {

        // login complete
        if (res.status) {
          this.incorrect = false;
          this.router.navigateByUrl('/dashboard');
        }

        // login error
        if (!res.status) {
          this.incorrect = true;
        }
      });

      this.subscription?.add(observ3);
  }

  // ตรวจสอบ email
  // ต้องกรอกอีเมล์
  public get email(): FormGroup {
    return this.loginForm.get('email') as FormGroup;
  }

  // ความถูกต้องของรูปแบบอีเมล์
  public get password() {
    return this.loginForm.get('password') as FormGroup;
  }

  private buildForm() {
    this.loginForm = this.fb.group({ //konkawat.k@gmail.com
      email: [null, [Validators.required, Validators.pattern('[A-Za-z0-9._]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
