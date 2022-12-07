import { Client, Collection, GatewayIntentBits, Events } from "discord.js";
import { token } from "./config.json";
import { getCommands } from "./commands";
import { Command, EnhanceClient } from "./types";

const client: EnhanceClient = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.login(token);

client.commands = new Collection();

const allCommands = getCommands();

allCommands.forEach((cmd) => {
  client.commands?.set(cmd.data.name, cmd);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = (interaction.client as EnhanceClient)?.commands?.get(
    interaction.commandName
  ) as Command;

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
