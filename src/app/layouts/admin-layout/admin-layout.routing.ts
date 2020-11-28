import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CurrencyExchangeComponent } from '../../pages/currency-exchange/currency-exchange.component';
import { MapsComponent } from '../../pages/rate-prediction/rate-prediction';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TransactionHistoryComponent } from '../../pages/transaction-history/transaction-history';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent ,canActivate : [ AuthGuardService ] },
    { path: 'user-profile', component: UserProfileComponent ,canActivate : [ AuthGuardService ] },
    { path: 'tables', component: TransactionHistoryComponent ,canActivate : [ AuthGuardService ] },
    { path: 'icons', component: CurrencyExchangeComponent ,canActivate : [ AuthGuardService ] },
    { path: 'maps', component: MapsComponent ,canActivate : [ AuthGuardService ] }
];
