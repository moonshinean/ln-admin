// @ts-ignore
import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {IAppData, IChennelData, IGameData, ITabList} from '../../common/module/IModel';
import {HomeService} from '../../common/service/home.service';
import {delay} from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   @ViewChild('scroll')
   scroolPannel: ElementRef;
   public tabList: ITabList[] = [
     {name: '设备', icon: 'iconfont  icon-shixiangxiajiantou-', flag: 'systems'},
     {name: '游戏', icon: 'iconfont  icon-shixiangxiajiantou-', flag: 'game'},
     {name: '发行渠道', icon: 'iconfont  icon-shixiangxiajiantou-', flag: 'channel'},
     {name: '应用', icon: 'iconfont  icon-shixiangxiajiantou-', flag: 'app'},
   ];

   public TabData: any = {
     systems: {list: [], data: [], checked: [], search: ''},
     game: {list: [], data: [], checked: [], search: ''},
     channel: {list: [], data: [], checked: [], search: ''},
     app: {list: [], data: [], checked: [], search: ''},
   };
   public tagFlag = 'systems'; // 区分是那个
   public display = false; // 显示弹窗
   public showListData = []; // 展示列表
   public sort: boolean; // 排序  true 表示顺序  false 表示倒叙

   constructor(
     private homeSrv: HomeService
   ) {
   }

   ngOnInit(): void {
     this.getData('systems', (data) => {
       Object.values(data).forEach((val, index) => {
         this.TabData.systems.list.push({label: val, value: Object.keys(data)[index]});
       });
     });
     this.getData('channels', (data) => {
       Object.values(data).forEach((val: IChennelData) => {
         this.TabData.channel.list.push({label: val.name, value: val.channelid});
       });
     });
     this.getData('game', (data) => {
       Object.values(data).forEach((val: IGameData) => {
         this.TabData.game.list.push({label: val.game_name, value: val.game_short});
       });
     });
     this.getData('apps', (data) => {
       console.log(data);
       Object.values(data).forEach((val: IAppData) => {
         this.TabData.app.list.push({label: val.name, value: val.appid, active: false});
       });
     });
   }

   // 获取数据
   public getData(value, callback): void {
     this.homeSrv.getInfoList(value).subscribe(res => {
       callback(res.data);
     });
   }

   // 设置数据
   public getScrolldata(data: number): void {
     this.TabData[this.tagFlag].list.slice(this.showListData.length, this.showListData.length + data).forEach((val, index) => {
       this.showListData.push({label: val.label, value: val.value, active: val.active});
     });
   }

   // 切换导航数据
   public showModal(e): void {
     this.display = true;
     this.showModalData(e);
   }

   public onScroll(): void {
     if (this.showListData.length < this.TabData[this.tagFlag].list.length){
       if (this.showListData.length + 20 >=  this.TabData[this.tagFlag].list.length){
         this.getScrolldata(20);
       }else {
         this.getScrolldata(10);
       }
     }
   }
   public  getCheckData(): void {
       console.log(this.TabData);
   }
   // 检查状态
   public checkStatus(status, item): void {
       item.active = status.checked;
   }

  public showModalData(e): void{
    if (e.flag !== this.tagFlag){
      // 设置滚动条到顶部
      // @ts-ignore
      this.scroolPannel.nativeElement.scrollTop = 0;
      this.tagFlag = e.flag;
      // 重置选择的项;
      if (this.tagFlag === 'app' || this.tagFlag === 'channel'){
        this.showListData = this.TabData[this.tagFlag].list.slice(0, 140);
      }else {
        this.showListData = this.TabData[this.tagFlag].list;
      }
     }
  }
  // 防抖
  public throttle(fn, wait): any {
    let timer = null;
    return () => {
      const context = this;
      const args = arguments;
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(context, args);
          timer = null;
        }, wait);
      }
    };
  }

 // 全选
  public  checkAll(e): void {
    this.TabData[this.tagFlag].data = [];
    if (e.checked){
        this.TabData[this.tagFlag].list.forEach((v, index) => {
          if (index <= this.showListData.length - 1){
            this.showListData[index].active  = true;
          }
           v.active = true;
          this.TabData[this.tagFlag].data.push(v.value);
        });
      }else {
        this.TabData[this.tagFlag].list.forEach((v, index) => {
          if (index <= this.showListData.length - 1){
            this.showListData[index].active  = false;
          }
          v.active = false;
        });
      }
  }
 // 快速搜索
  public  searchData(e): void {
      console.log(e);
      if (e !== ''){
        this.showListData = this.TabData[this.tagFlag].list.filter(val => {
          if (val.label.includes(e)){
            return val;
          }
        });
      }else {
        this.showListData = this.TabData[this.tagFlag].list.slice(0, 140);
      }
  }
 // 设置排序
  public  setSort(): void {
     if (this.showListData.length < this.TabData[this.tagFlag].list.length){
       this.showListData =  this.TabData[this.tagFlag].list.reverse().slice(0, 140);
     }else {
       this.showListData.reverse();
     }
  }
 }
