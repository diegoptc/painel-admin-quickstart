import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError, switchMap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SessionService } from 'src/services/session.service';
import { LoadingService } from 'src/services/loading.service';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
    constructor(
        private messageService: MessageService,
        private http: HttpClient,
        private router: Router,
        private sessionService: SessionService,
        private loadingService: LoadingService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let newReq = req.clone();
      const token = localStorage.getItem('token');
      if (token && !newReq.headers.get('Authorization')) {
        newReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
      }
      this.loadingService.setLoading(true);
      return next.handle(newReq).pipe(
          catchError((error: any) => {
            if (error.status === 401) {
              //TODO: Tentar melhorar essa parte onde limpa a sessão.
              if (error.url.endsWith('refresh-token')) {
                this.sessionService.clearSession();
              }
              if (localStorage.getItem('refreshToken')) {
                return this.http.post(`${environment.apiBaseUrl}/auth/refresh-token`, {}, {
                  headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
                  }
                }).pipe(
                  switchMap((response: any) => {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    return next.handle(req.clone({
                      setHeaders: {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        Authorization: `Bearer ${response.refreshToken}`
                      }
                    }));
                  })
                );
              } else {
                this.sessionService.clearSession();
                this.messageService.add({
                  key: 'bc',
                  severity: 'warn',
                  summary: 'Sessão expirada',
                  detail: 'Sua sessão expirou, por favor faça o login novamente.'
                });
                this.router.navigate(['/auth/login']);
              }
              return throwError(error);
            } else {
              this.messageService.add({
                key: 'bc',
                severity: 'error',
                summary: 'Oops!',
                detail: error?.error?.message ? error.error.message : 'Não foi possível comunicar com o servidor'
              });
              return throwError(error);
            }
          }),
          finalize(() => {
            this.loadingService.setLoading(false);
          })
      );
    }
}
