const mineflayer = require('mineflayer');

const config = {
  host: 'gaineagers007.aternos.me', // replace this
  port: 25565,
  username: 'AFKBot',
  version: '1.21.11',              // replace with your server's MC version
  auth: 'offline',
};

function createBot() {
  const bot = mineflayer.createBot(config);

  bot.on('login', () => console.log('Bot connected'));

  bot.on('spawn', () => {
    console.log('Bot spawned, anti-AFK active');

    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
      bot.look(bot.entity.yaw + 1, 0, false);
    }, 25000);
  });

  bot.on('chat', (username, message) => {
    if (message === '!pos') bot.chat(`Position: ${JSON.stringify(bot.entity.position)}`);
  });

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Error:', err.message);
    setTimeout(createBot, 10000);
  });

  bot.on('end', () => {
    console.log('Disconnected, reconnecting in 10s...');
    setTimeout(createBot, 10000);
  });
}

createBot();