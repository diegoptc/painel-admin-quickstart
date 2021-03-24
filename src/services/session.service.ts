import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private authService: AuthService) { }

  login(loginDTO: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.authenticate(loginDTO).then((response: any) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  async logout(): Promise<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      await this.authService.logout(refreshToken);
      this.clearSession();
    }
  }

  clearSession(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}
