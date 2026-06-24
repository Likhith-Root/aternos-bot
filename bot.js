const mineflayer = require('mineflayer');

const config = {
  host: 'mudhapappu.aternos.me',
  port: 25565,
  username: 'AFKBot',
  version: '1.21.11',
  auth: 'offline',
};

function createBot() {
  const bot = mineflayer.createBot(config);

  bot.on('login', () => console.log('Bot connected'));

  bot.on('spawn', () => {
    console.log('Bot spawned, anti-AFK active');

    setInterval(() => {
      // Walk forward and back to simulate real movement
      bot.setControlState('forward', true);
      setTimeout(() => {
        bot.setControlState('forward', false);
        bot.setControlState('back', true);
        setTimeout(() => {
          bot.setControlState('back', false);
          bot.setControlState('jump', true);
          setTimeout(() => bot.setControlState('jump', false), 500);
        }, 2000);
      }, 2000);

      bot.look(bot.entity.yaw + 1, 0, false);
    }, 15000); // every 15 seconds
  });

  bot.on('chat', (username, message) => {
    if (message === '!pos') bot.chat(`Position: ${JSON.stringify(bot.entity.position)}`);
  });

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason);
    setTimeout(createBot, 30000); // wait 30s before reconnecting
  });

  bot.on('error', (err) => {
    console.log('Error:', err.message);
    setTimeout(createBot, 30000);
  });

  bot.on('end', () => {
    console.log('Disconnected, reconnecting in 30s...');
    setTimeout(createBot, 30000);
  });
}

createBot();