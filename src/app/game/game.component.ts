import { Component, OnInit } from '@angular/core';

import { Game } from '../game';
import { GameService } from '../game.service';
import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  games: Game[] = [];
  players: Player[] = [];

  playerOneOptions: Player[] = [];
  playerTwoOptions: Player[] = [];
  winnerOptions: Player[] = [];

  selectedPlayerOneId: number;
  selectedPlayerTwoId: number;
  selectedWinnerId: number;

  displayedColumns: string[] = ['id', 'players', 'winner'];

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.getGames();
    this.getPlayers();
  }

  getGames(): void {
    this.gameService.getGames()
      .subscribe(items => this.games = items);
  }

  getPlayers(): void {
    this.playerService.getPlayers()
      .subscribe(items => {
        this.players = items;
        this.populatePlayersOptions();
      });
  }

  populatePlayersOptions() {
    this.playerOneOptions = this.players;
    this.playerTwoOptions = this.players;
  }

  populateOpponentOptions(key: string): void {
    this.selectedWinnerId = null;
    if (key === 'playerOne') {
      this.playerTwoOptions = this.players.filter(player => {
        return player.id !== this.selectedPlayerOneId;
      });
    } else {
      this.playerOneOptions = this.players.filter(player => {
        return player.id !== this.selectedPlayerTwoId;
      });
    }
    this.populateWinnerOptions();
  }

  populateWinnerOptions(): void {
    this.winnerOptions = this.players.filter(player => (
      player.id === this.selectedPlayerOneId || player.id === this.selectedPlayerTwoId
    ));
  }

  restGameState(): void {
    this.game = new Game();
    this.selectedPlayerOneId = null;
    this.selectedPlayerTwoId = null;
    this.selectedWinnerId = null;
    this.populatePlayersOptions();
    this.winnerOptions = [];
  }

  saveGame(): void {
    this.game.players = this.winnerOptions;
    this.game.winner = this.players.find(player => player.id === this.selectedWinnerId);
    this.gameService.addGame(this.game)
      .subscribe(game => {
        this.games = [...this.games, game];
      });
  }

}
