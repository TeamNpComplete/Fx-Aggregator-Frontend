import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CurrencyExchangeComponent } from '../../pages/currency-exchange/currency-exchange.component';
import { MapsComponent } from '../../pages/rate-prediction/rate-prediction';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TransactionHistoryComponent } from '../../pages/transaction-history/transaction-history';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TransactionHistoryComponent },
    { path: 'icons',          component: CurrencyExchangeComponent },
    { path: 'maps',           component: MapsComponent }
];
