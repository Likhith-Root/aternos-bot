const mineflayer = require('mineflayer');

const config = {
  host: 'mudhapappu.aternos.me',
  port: 25565,
  username: 'Mudha_Nigger',
  version: '1.21.11',
  auth: 'offline',
};

function createBot() {
  const bot = mineflayer.createBot(config);

  bot.on('login', () => console.log('Bot connected'));

  bot.on('spawn', () => {
    console.log('Bot spawned, anti-AFK active');
    startMovementLoop(bot);
  });

  bot.on('chat', (username, message) => {
    if (message === '!pos') bot.chat(`Position: ${JSON.stringify(bot.entity.position)}`);
  });

  bot.on('kicked', (reason) => {
    console.log('Kicked:', JSON.stringify(reason));
    setTimeout(createBot, 60000);
  });

  bot.on('error', (err) => {
    console.log('Error:', err.message);
    setTimeout(createBot, 60000);
  });

  bot.on('end', () => {
    console.log('Disconnected, reconnecting in 60s...');
    setTimeout(createBot, 60000);
  });
}

function startMovementLoop(bot) {
  let step = 0;

  setInterval(() => {
    // Stop all movement first
    bot.clearControlStates();

    step = (step + 1) % 4;

    switch (step) {
      case 0:
        bot.setControlState('forward', true);
        bot.look(0, 0, false);
        break;
      case 1:
        bot.setControlState('forward', true);
        bot.look(Math.PI / 2, 0, false);
        break;
      case 2:
        bot.setControlState('forward', true);
        bot.look(Math.PI, 0, false);
        break;
      case 3:
        bot.setControlState('forward', true);
        bot.look((3 * Math.PI) / 2, 0, false);
        // Jump occasionally
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
        break;
    }
  }, 5000); // change direction every 5 seconds
}

createBot();