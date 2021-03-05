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
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {VirtualScrollerModule} from '../common/components/virtual-scroller/virtual-scroller.module';
import {OnScrollDirective} from '../common/directives/on-scroll.directive';
import {FormsModule} from '@angular/forms';
import {RippleModule} from 'primeng/ripple';


@NgModule({
  declarations: [HomeComponent, HeaderComponent, SidebarComponent, OnScrollDirective],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SidebarModule,
    CheckboxModule,
    InputTextModule,
    ScrollPanelModule,
    ButtonModule,
    ProgressSpinnerModule,
    VirtualScrollerModule,
    FormsModule,
    RippleModule,
  ],
  exports: [
    OnScrollDirective
  ]
})
export class HomeModule { }
