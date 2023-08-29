import { Component, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { MatDialogModule,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DecimalPipe} from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

registerLocaleData(en);

const MATERIAL_MODULES = [MatToolbarModule,
  MatIconModule
];


@NgModule({
  exports : MATERIAL_MODULES,
  providers: [authInterceptorProviders, DatePipe,DecimalPipe,{ provide: MAT_DIALOG_DATA, useValue: {} ,},{ provide: APP_BASE_HREF, useValue: '' },
  { provide: MatDialogRef, useValue: {} }],
  /*providers: [ DatePipe,DecimalPipe,{ provide: NZ_I18N, useValue: en_US }
            , { provide: MAT_DIALOG_DATA, useValue: {} ,},{ provide: APP_BASE_HREF, useValue: '' },
              { provide: MatDialogRef, useValue: {}  }
              ],*/
  bootstrap: [AppComponent]
})
export class AppModule { }
