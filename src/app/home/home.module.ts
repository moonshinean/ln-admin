import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {SidebarModule} from 'primeng/sidebar';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {ScrollPanelModule} from 'primeng/scrollpanel';


@NgModule({
  declarations: [HomeComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SidebarModule,
    CheckboxModule,
    InputTextModule,
    ScrollPanelModule
  ]
})
export class HomeModule { }
