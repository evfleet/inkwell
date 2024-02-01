export type Player = {
  id: "public id";
  score: 0;
  username: "Player 1";
  isHost: boolean;
  isDrawer: boolean;
};

type ActiveGame = {
  active: true;
  roundIndex: number;
  settings: Settings;
};

type InactiveGame = {
  active: false;
  roundIndex: null;
  settings: Settings;
};

type Settings = {
  roundAmount: number;
  turnDuration: number;
};

export type Game = ActiveGame | InactiveGame;
