import Mock from 'mockjs';
import {systemData, gameData, channelData, appData} from './data';
// 拦截请求，返回假数据

Mock.mock('http://bloc.leniugame.com/Public/getAppList?action=systems', {
  message: '调用成功',
  data: systemData,
  status: 200
});
Mock.mock('http://bloc.leniugame.com/Public/getAppList?action=game', {
  message: '调用成功',
  data: gameData,
  status: 200
});
Mock.mock('http://bloc.leniugame.com/Public/getAppList?action=channels', {
  message: '调用成功',
  data: channelData,
  status: 200
});
Mock.mock('http://bloc.leniugame.com/Public/getAppList?action=apps', {
  message: '调用成功',
  data: appData,
  status: 200
});
