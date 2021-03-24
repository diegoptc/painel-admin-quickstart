import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/services/auth.service';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup = {} as FormGroup;
  public showPassword = false;
  public showConfirmPassword = false;
  public user: any;
  private token = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public globalService: GlobalService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.matchValues('password')]]
    }, {
      validators: this.matchValues.bind(this)
    });
    this.route.queryParams.subscribe(async (queryParams) => {
      if (queryParams.token) {
       this.token = queryParams.token;
       this.user = await this.authService.verifyRecoverToken(this.token);
      }
    });
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword(this.resetPasswordForm.value).then(() => {
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Redefinir Senha',
          detail: 'Senha redefinida com sucesso, basta logar com a nova senha.'
        });
        this.router.navigate(['/auth/login']);
      });
    }else {
      this.messageService.add({
        key: 'bc',
        severity: 'error',
        summary: 'Formulário Inválido',
        detail: 'Corrija os campos necessário antes de prosseguir.'
      });
      Object.keys(this.resetPasswordForm.controls).forEach((key) => {
        this.resetPasswordForm.get(key)?.markAsDirty();
      });
    }
  }

  // eslint-disable-next-line no-shadow
  matchValues(matchTo: string): (AbstractControl: any) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.get(matchTo)?.value
        ? null
        : { notMatching: 'O campo confirmar senha não coincide com a senha.' };
  }
}
