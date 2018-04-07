import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { MessageComponent } from './message/message.component';
import { CircleComponent } from './circle/circle.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsersService } from './services/users.service';
import { MessagesService } from './services/messages.service';
import { CirclesService } from './services/circles.service';
import { UserCircleServiceService } from './services/user-circle-service.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterdataPipe } from './filterdata.pipe';
import { FiltermsgPipe } from './filtermsg.pipe';

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        MessageComponent,
        CircleComponent,
        LoginComponent,
        RegistrationComponent,
        DashboardComponent,
     FilterdataPipe,
     FiltermsgPipe,
    ],
    imports: [
        BrowserModule,
        HttpModule, FormsModule,
        RouterModule.forRoot([
            { path: '', component: LoginComponent },
            { path: 'register', component: RegistrationComponent },
            { path: 'dashboard', component: (localStorage.getItem('token') === null) ? LoginComponent : DashboardComponent }
            /*(localStorage.getItem('token') === null) ? LoginComponent : DashboardComponent}*/
        ])
    ],
    providers: [UsersService, CirclesService, MessagesService,UserCircleServiceService],
    bootstrap: [AppComponent]
})
export class AppModule { }
