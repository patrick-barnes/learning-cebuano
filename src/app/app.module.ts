import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WordRootComponent } from './word-root/word-root.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './search/search.component';

@NgModule({ declarations: [
        AppComponent,
        WordRootComponent,
        SearchComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        AppRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
