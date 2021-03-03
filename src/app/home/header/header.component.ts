// @ts-ignore
import { Component, OnInit } from '@angular/core';
import {IAppData, IChennelData, ITabList} from '../../common/module/IModel';
import {HomeService} from '../../common/service/home.service';
import {fromEvent} from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public tabList: ITabList[] = [
    {name: '设备', icon: 'iconfont  icon-shixiangxiajiantou-'},
    {name: '游戏', icon: 'iconfont  icon-shixiangxiajiantou-'},
    {name: '发行渠道', icon: 'iconfont  icon-shixiangxiajiantou-'},
    {name: '应用', icon: 'iconfont  icon-shixiangxiajiantou-'},
  ];
  public tabTypeList: any[] = [
    {label: '设备', value: 'systems'},
    {label: '游戏', value: 'game'},
    {label: '发行渠道', value: 'channel'},
    {label: '应用', value: 'app'},
  ];
  public tagFlag =  'systems';
  public display = false;
  public systemsList = []; // 系统
  public appsList = []; // 系统
  public channelsList = []; // 系统
  public gamesList = []; // 系统
  public showListData = [];
  constructor(
    private homeSrv: HomeService
  ) { }

  ngOnInit(): void {
    this.getData('systems', (data) => {
      Object.values(data).forEach((val, index) => {
        this.systemsList.push({label: val, value: Object.keys(data)[index]});
      });
    });
    this.getData('channels', (data) => {
      Object.values(data).forEach((val: IChennelData) => {
        this.channelsList.push({label: val.name, value: val.channelid});
      });
    });
    this.getData('apps', (data) => {
      console.log(data);
      Object.values(data).forEach((val: IAppData) => {
        this.appsList.push({label: val.name, value: val.appid});
        this.showListData = this.appsList.slice(0, 100);
        setTimeout(() => {
          this.appsList.slice(100, this.appsList.length).forEach(res => {
            this.showListData.push({label: res.label, value: res.value});
          });
        }, 10);
      });
    });
  }
  // 获取数据
  public  getData(value, callback): void {
    this.homeSrv.getInfoList(value).subscribe(res => {
      callback(res.data);
    });
  }
  // 获取 滚动条的数据
  public showScrollTop(e): void {
      console.log(e);
  }

}
