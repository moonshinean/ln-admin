export interface ITabList{
  name?: string;
  icon?: string;
  flag?: string;
}

export interface IChennelData{
  channelid?: string;
  short?: string;
  name?: string;
}
export interface IGameData{
  game_name?: string;
  game_short?: string;
  game_id?: string;
}
export interface IAppData {
  game_id?: string;
  appid?: string;
  type?: number;
  system?: number;
  name?: string;
  short?: string;
  payee?: string;
  apple_id?: string;
  status?: string;
  app_tags?: string;
  label?: string;
  short_name?: string;
  change_short?: string;
}
