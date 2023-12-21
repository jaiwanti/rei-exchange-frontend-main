import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  emailRegex,
  objectToFormData,
  validateAllFormFields,
  stripePublishableKeyPattern,
  stripeSecretKeyPattern,
  phoneRegex,
} from 'src/app/main/shared/functions.component'
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;
  signUpForm!: FormGroup;
  userInfo: any;
  pass: any;
  rememberComp: any;
  organizationsList: any;
  username: any;
  loadingIndicator: boolean = false;
  host: any;
  now: any = new Date();
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private titleService: Title
  ) { }
  ngOnInit() {
    this.titleService.setTitle('Sign In');
    this.signInFormInitialize();
    this.signUpFormInitialize();
    if (this.userInfo && this.rememberComp) {
      this.router.navigate(['/portal/dashboard']);
    }
  }
  signInFormInitialize() {
    this.signInForm = this.formBuilder.group({
      username: new FormControl(this.username ? this.username : '', [Validators.required]),
      password: new FormControl(this.pass ? this.pass : '', [Validators.required]),
      rememberComp: new FormControl(false, []),
      rememberPass: new FormControl(false, []),
    })
  }

  signUpFormInitialize() {
    this.signUpForm = this.formBuilder.group({
      first_name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email_address: ['', [Validators.required, Validators.pattern(emailRegex)]],
      phone_number: ['', [Validators.required, Validators.pattern(phoneRegex)]],
      usertypeid: [4, []],
      createdate: [this.now, []],
    })
  }

  onSubmit(signinform: FormGroup) {
    // this.router.navigate(['/portal/property']);
    this.authenticationService.userLogin({ password: signinform.value.password, email: signinform.value.username })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', JSON.stringify(res.data.token));
          localStorage.setItem('user', JSON.stringify(res.data));
          this.router.navigate(['/portal/property']);
          // this.router.navigate(['/portal/user']);
          this.toastr.success('Login successfull!', 'Success');
        },
        error: (error: any) => {
          if (error?.message) {
            this.toastr.error(error.error.message, 'Error');
          }
          else {
            this.toastr.error('Invalid email or password!', 'Error');
          }
        },
      });
  }

  // addUser() {
  //   let payload = this.signUpForm.value;
  //   this.authenticationService.addUser(payload)
  //     .subscribe({
  //       next: (res: any) => {
  //         this.toastr.success('Your request has been submitted!', 'Success');
  //         this.signUpFormInitialize();
  //       },
  //       error: (error: any) => {
  //         this.toastr.error(error.message, 'Error');
  //       },
  //     });
  // }
  

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}

