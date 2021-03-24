import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { RecoverPasswordComponent } from 'src/app/components/recover-password/recover-password.component';
import { GlobalService } from 'src/services/global.service';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [DialogService]
})
export class LoginComponent implements OnInit {
  public showPassword = false;
  public loginForm: FormGroup = {} as FormGroup;
  private nextRoute = '/dashboard';

  constructor(
    private fb: FormBuilder,
    public dialogService: DialogService,
    private deviceService: DeviceDetectorService,
    public globalService: GlobalService,
    private messageService: MessageService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams.nextRoute) {
       this.nextRoute = queryParams.nextRoute;
      }
    });
  }

  showModalForRecoverPassword(): void {
    this.dialogService.open(RecoverPasswordComponent, {
      data: {
        email: this.loginForm.get('email')?.valid ? this.loginForm.get('email')?.value : null
      },
      header: 'Recuperar Senha',
      width: this.deviceService.isDesktop() ? '30%' : '80%'
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.sessionService.login(this.loginForm.value).then((response) => {
        this.router.navigate([this.nextRoute]);
      }).catch((error) => {
        if (error.message && !error.status) {
          this.messageService.add({key: 'bc', severity: 'error', summary: 'Acesso Negado!', detail: error.message});
        }
      });
    } else {
      this.messageService.add({
        key: 'bc',
        severity: 'error',
        summary: 'Formulário Inválido',
        detail: 'Corrija os campos necessário antes de prosseguir.'
      });
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsDirty();
      });
    }
  }
}
