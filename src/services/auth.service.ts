import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) { }

  authenticate(loginDTO: any): Promise<any> {
    return this.http.post(this.endpoint.concat('/login'), loginDTO).toPromise();
  }

  logout(refreshToken: string): Promise<any> {
    return this.http.post(this.endpoint.concat('/logout'), {}, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: refreshToken
      }
    }).toPromise();
  }

  recoverPassword(email: string): Promise<any> {
    return this.http.get(this.endpoint.concat(`/recover-password?email=${email}`)).toPromise();
  }

  resetPassword(data: any): Promise<any> {
    return this.http.post(this.endpoint.concat('/reset-password'), data).toPromise();
  }

  verifyRecoverToken(token: string): Promise<any> {
    return this.http.get(this.endpoint.concat(`/recover-password/verify-token?token=${token}`)).toPromise();
  }
}
