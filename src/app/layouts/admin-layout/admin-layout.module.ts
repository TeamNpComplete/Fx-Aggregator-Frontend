import { AuthenticationService } from './../../services/authentication.service';
import { ExchangeRatesService } from './../../services/exchange-rates.service';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CurrencyExchangeComponent } from '../../pages/currency-exchange/currency-exchange.component';
import { MapsComponent } from '../../pages/rate-prediction/rate-prediction';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TransactionHistoryComponent } from '../../pages/transaction-history/transaction-history';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChartsModule } from 'ng2-charts';
import { MatButtonModule } from '@angular/material/button';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css'
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MDBBootstrapModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    ChartsModule,
    MatButtonModule,
    NgxFlagIconCssModule

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TransactionHistoryComponent,
    CurrencyExchangeComponent,
    MapsComponent
  ],
  providers: [
    AuthenticationService,
    ExchangeRatesService,
    AuthGuardService
  ]
})

export class AdminLayoutModule { }
