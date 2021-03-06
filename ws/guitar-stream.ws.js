const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 40510});

const _ = require('lodash');

let streams = [];

wss.on('connection', ws => {
  ws.on('message', msg => {
    msg = JSON.parse(msg);
    let streamer = _.find(streams, {user: msg.user});
    if (!streamer) {
      streams.push({
        user: msg.user,
        watchers: []
      });
      streamer = _.last(streams);
    }

    if (msg.mode === 'watch') {
      streamer.watchers.push(ws);
    }

    if (msg.mode === 'play') {
      streamer.watchers.forEach(watcher => {
        if (watcher.readyState === 1) {
          watcher.send(
              JSON.stringify({
                mode: 'listen',
                user: streamer.user,
                string: msg.string,
                chord: msg.chord,
                capo: msg.capo
              })
          );
        }
      });
    }
  });

  ws.on('close', (code, msg) => {
    if (msg) {
      msg = JSON.parse(msg);
      const streamer = _.find({user: msg.user});
      _.pull(streamer.watchers, ws);
    }
  });
});
