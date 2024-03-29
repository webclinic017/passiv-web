import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive';
import auth from './auth';
import demo from './demo';
import language from './language';
import simple from './simple';
import simpleList from './simpleList';
import updateServiceWorker from './updateServiceWorker';
import online from './online';
import selectedTimeframe from './performance';
import { SubscriptionData } from '../types/subscription';
import { GroupInfoData, Balance } from '../types/groupInfo';
import { GroupData } from '../types/group';
import { Currency } from '../types/currency';
import { Feature } from '../types/feature';
import { CurrencyRate } from '../types/currencyRate';
import { Account } from '../types/account';
import { Authorization } from '../types/authorization';
import { Brokerage } from '../types/brokerage';
import { Position } from '../types/account';
import { PerformanceData } from '../types/performance';
import { Settings } from '../types/settings';

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    appTime: Date.now,
    auth,
    browser: responsiveStateReducer,
    demo,
    language,
    updateServiceWorker,
    online,
    selectedTimeframe,
    helpArticles: simple<any>({
      baseType: 'FETCH_HELP_ARTICLES',
      userData: false,
    }),
    authorizations: simple<Authorization[]>({
      baseType: 'FETCH_AUTHORIZATIONS',
      userData: true,
    }),
    brokerages: simple<Brokerage[]>({
      baseType: 'FETCH_BROKERAGES',
      userData: false,
    }),
    features: simple<Feature[]>({
      baseType: 'FETCH_FEATURES',
      userData: true,
    }),
    currencies: simple<Currency[]>({
      baseType: 'FETCH_CURRENCIES',
      userData: false,
    }),
    currencyRates: simple<CurrencyRate[]>({
      baseType: 'FETCH_CURRENCY_RATES',
      userData: false,
    }),
    groups: simple<GroupData[]>({
      baseType: 'FETCH_GROUPS',
      userData: true,
    }),
    settings: simple<Settings>({
      baseType: 'FETCH_SETTINGS',
      userData: true,
    }),
    subscription: simple<SubscriptionData>({
      baseType: 'FETCH_SUBSCRIPTION',
      userData: true,
    }),
    plans: simple<any>({
      baseType: 'FETCH_PLANS',
      userData: true,
    }),
    accounts: simple<Account[]>({
      baseType: 'FETCH_ACCOUNTS',
      userData: true,
    }),
    accountBalances: simpleList<Balance[]>({
      baseType: 'FETCH_ACCOUNT_BALANCES',
      userData: true,
    }),
    accountPositions: simpleList<Position[]>({
      baseType: 'FETCH_ACCOUNT_POSITIONS',
      userData: true,
    }),
    groupInfo: simpleList<GroupInfoData>({
      baseType: 'FETCH_GROUP_INFO',
      userData: true,
    }),
    performanceAll: simple<PerformanceData>({
      baseType: 'FETCH_PERFORMANCE_ALL',
      userData: true,
    }),
  });
