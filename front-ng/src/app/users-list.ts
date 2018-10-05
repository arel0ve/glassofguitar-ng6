import { User } from './user';

export let USERS: User[] = [{
    login: '', isVerify: false, verifyCode: '0', email: '0@0.0', hashedPassword: '', salt: '', tag: '', name: 'Valerii Psol',
    photo: '', numberPhoto: 0, birthday: new Date(1994, 7, 18), place: 'Andriivka', country: 'Ukraine',
    biography: '', hatColor: '#a413f2', created: new Date(1994, 7, 18),
    songs: [{
      id: '#', artist: 'Ludwig van Beethoven', title: 'Für Elise', author: '', size: '3/8', speed: '63',
      notes: [
        '------', '------', '------', '------', '-----0', '----4-',
        '-----0', '----4-', '-----0', '----0-', '----3-', '----1-'
      ]
    }, {
      id: '#', artist: 'Ludwig van Beethoven', title: 'Für Elise', author: '', size: '3/8', speed: '63',
      notes: [
        '------', '------', '------', '------', '-----0', '----4-'
      ]
    }, {
      id: '#', artist: 'Ludwig van Beethoven', title: 'Für Elise', author: '', size: '3/8', speed: '63',
      notes: [
        '------', '------', '------', '------', '-----0', '----4-'
      ]
    }
    ]
  }
];
