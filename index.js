
const { createInterface } = require('node:readline');
const { execSync } = require('child_process');
const fetch = require('node-fetch');
const { Client, Routes, REST } = require('discord.js');
const { token } = require('./config.json'); // Mova o token para um arquivo separado por questões de segurança

const ping = {
  name: 'ping',
  description: 'Pings the bot and shows the latency'
};

// Command Example
const command2 = {
  name:'command2',
  description:'yes'
};

// Certifique-se de incluir o comando ping para evitar o erro de remoção de Entry Point Command
const commands = [ping, command2]; // Adicione todos os comandos que o bot deve manter

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands('1041150882374483979'), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

// Join the Discord for support: https://discord.gg/M5MSE9CvNM

const client = new Client({ intents: [] });
const rl = createInterface({ input: process.stdin, output: process.stdout });

client.on('interactionCreate', (interaction) => {
  if (interaction.commandName === 'ping') {
    interaction.reply(`Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  } else if(interaction.commandName === 'command2') {
    interaction.reply('example command');
  } else {
    interaction.reply('this command's response has not been added yet!');
  }
});

client.login(token);
