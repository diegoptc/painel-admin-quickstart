import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  controlFormInvalidMessage(control: any, label: string): string {
    let message = '';
    if (control && control.invalid) {
      const errors = Object.assign({}, control.errors);
      if (errors.required) {
        message = `O campo ${label} é obrigatório`;
      }else if (errors.email) {
        message = 'O email está inválido';
      }else if (errors.notMatching) {
        message = errors.notMatching;
      }
    }
    return message;
  }
}
