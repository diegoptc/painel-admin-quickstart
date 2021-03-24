import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/services/auth.service';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  public recoverPasswordForm: FormGroup = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    public globalService: GlobalService,
    private messageService: MessageService,
    private authService: AuthService,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.recoverPasswordForm = this.fb.group({
      email: [this.config?.data?.email, [Validators.required, Validators.email]]
    });
  }

  recoverPassword(): void {
    if (this.recoverPasswordForm.valid) {
      this.authService.recoverPassword(this.recoverPasswordForm.get('email')?.value).then((response) => {
        this.messageService.add({key: 'bc', severity: 'success', summary: 'Recuperação de Senha', detail: response.message});
        this.ref.close();
      });
    } else {
      this.messageService.add({
        key: 'bc',
        severity: 'error',
        summary: 'Formulário Inválido',
        detail: 'Corrija os campos necessário antes de prosseguir.'
      });
      Object.keys(this.recoverPasswordForm.controls).forEach((key) => {
        this.recoverPasswordForm.get(key)?.markAsDirty();
      });
    }
  }
}
