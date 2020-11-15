import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
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
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TransactionHistoryComponent,
    CurrencyExchangeComponent,
    MapsComponent
  ]
})

export class AdminLayoutModule {}
