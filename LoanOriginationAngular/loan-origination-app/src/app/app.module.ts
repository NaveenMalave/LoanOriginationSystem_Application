import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerdetailsComponent } from './components/customerdetails/customerdetails.component';
import { CustomersearchComponent } from './components/customersearch/customersearch.component';
import { LoanhistoryComponent } from './components/loanhistory/loanhistory.component';
import { ApplyloanComponent } from './components/applyloan/applyloan.component';
import { DashboadComponent } from './components/dashboad/dashboad.component';
//import { AppRoutingModule } from './components/app-routing/app-routing.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ExistingdetailsComponent } from './components/existingdetails/existingdetails.component';
import { AuthGuardGuard as AuthGuard } from './guard/auth-guard.guard';
import { ViewallapplicationsComponent } from './components/viewallapplications/viewallapplications.component';
import { ContentLoginComponent } from './components/content-login/content-login.component';
import { AuthIntercepterService } from './auth.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboadComponent, canActivate : [AuthGuard] },
  { path: 'customer-detail', component: CustomerdetailsComponent, canActivate : [AuthGuard] },
  { path: 'customer-search', component: CustomersearchComponent, canActivate : [AuthGuard] },
  { path: 'apply-loan/:id', component: ApplyloanComponent, canActivate : [AuthGuard] },
  { path: 'loan-history', component: LoanhistoryComponent, canActivate : [AuthGuard] },
  {path: 'confirmation', component: ConfirmationComponent, canActivate : [AuthGuard]},
  {path: 'existingdetails/:id', component: ExistingdetailsComponent, canActivate : [AuthGuard]},
  {path: 'allapplications', component: ViewallapplicationsComponent, canActivate : [AuthGuard]}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerdetailsComponent,
    CustomersearchComponent,
    LoanhistoryComponent,
    ApplyloanComponent,
    DashboadComponent,
    ContentComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmationComponent,
    ExistingdetailsComponent,
    ViewallapplicationsComponent,
    ContentLoginComponent



  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    //AppRoutingModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory:
        HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
   

  ],
  providers: [LoginService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthIntercepterService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
