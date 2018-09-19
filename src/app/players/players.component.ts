import { Component, OnInit } from '@angular/core';

import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];

  displayedColumns: string[] = ['id', 'nickname', 'wins', 'loses'];

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.getPlayers()
    .subscribe(players => this.players = players);
  }

  add(nickname: string): void {
    nickname = nickname.trim();
    if (!nickname) { return; }
    this.playerService.addPlayer({ nickname } as Player)
      .subscribe(player => {
        this.players = [...this.players, player];
      });
  }
}
