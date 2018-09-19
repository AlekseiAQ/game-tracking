import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const games = [
      {
        id: 1,
        players: [
          { id: 1, nickname: 'Pikachu' },
          { id: 2, nickname: 'Charmander' }
        ],
        winner: { id: 1, nickname: 'Pikachu' }
      },
      {
        id: 2,
        players: [
          { id: 3, nickname: 'Bulbasaur' },
          { id: 4, nickname: 'Squirtle' }
        ],
        winner: { id: 4, nickname: 'Squirtle' }
      },
      {
        id: 3,
        players: [
          { id: 1, nickname: 'Pikachu' },
          { id: 5, nickname: 'Ditto' }
        ],
        winner: { id: 1, nickname: 'Pikachu' }
      },
    ];
    const players = [
      { id: 1, nickname: 'Pikachu', wins: 5, loses: 3 },
      { id: 2, nickname: 'Charmander', wins: 4, loses: 3 },
      { id: 3, nickname: 'Bulbasaur', wins: 4, loses: 3 },
      { id: 4, nickname: 'Squirtle', wins: 2, loses: 1 },
      { id: 5, nickname: 'Ditto', wins: 0, loses: 5 },
    ];
    return {games, players};
  }
}
