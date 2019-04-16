import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';

//Auth
import { AuthGuardService } from './providers/auth';

//Firebase
import { FirebaseService } from './providers/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UsuariosModule } from './views/usuarios/usuarios.module';
import { EventsModule } from './views/events/events.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// export const firebaseconfig = {
//   apiKey: "AIzaSyDu5tGf8tr9CSNnHVZR3rGKwuKAvQLQvX0",
//   authDomain: "universidade-do-varejo-c3ac1.firebaseapp.com",
//   databaseURL: "https://universidade-do-varejo-c3ac1.firebaseio.com",
//   projectId: "universidade-do-varejo-c3ac1",
//   storageBucket: "universidade-do-varejo-c3ac1.appspot.com",
//   messagingSenderId: "345410861798",
//   timestampsInSnapshots: true
// };
export const firebaseconfig = {
  apiKey: "AIzaSyD68MUPESc0iJz9snbjaIC6VSpBAJIZ8R8",
  authDomain: "universidade-do-varejo-c6604.firebaseapp.com",
  databaseURL: "https://universidade-do-varejo-c6604.firebaseio.com",
  projectId: "universidade-do-varejo-c6604",
  storageBucket: "universidade-do-varejo-c6604.appspot.com",
  messagingSenderId: "1060040447696",
  timestampsInSnapshots: true
};
@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    UsuariosModule,
    EventsModule,
    NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    FirebaseService,
    AuthGuardService,
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
