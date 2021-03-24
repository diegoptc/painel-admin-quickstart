import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseInterceptor } from './http-interceptors/base/base-interceptor.service';


import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';

registerLocaleData(localePT);

import { NgxMaskModule, IConfig } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false
};

/* PrimeNG Modules */
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ChartModule } from 'primeng/chart';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { StepsModule } from 'primeng/steps';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';

//Other Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { WidgetComponent } from './components/widget/widget.component';
import { Error404Component } from './pages/error404/error404.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { DefaultComponent } from './layouts/default/default.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    WidgetComponent,
    RecoverPasswordComponent,
    Error404Component,
    DashboardComponent,
    DefaultComponent,
    ResetPasswordComponent
  ],
  imports: [
    NgxMaskModule.forRoot(maskConfig),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    PanelMenuModule,
    ChartModule,
    BreadcrumbModule,
    ToolbarModule,
    SidebarModule,
    MenuModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    DynamicDialogModule,
    RippleModule,
    TooltipModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    BlockUIModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    TableModule,
    AvatarModule,
    StepsModule,
    InputSwitchModule,
    TagModule,
    DropdownModule,
    DividerModule
  ],
  providers: [
    AuthGuardService,
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
