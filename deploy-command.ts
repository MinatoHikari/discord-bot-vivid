import { getCommands } from "./commands";
import { Command } from "./types";
import {
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  REST,
  Routes,
} from "discord.js";
import { token, clientId } from "./config.json";

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

const allCommands = getCommands();
allCommands.forEach((cmd) => {
  commands.push(cmd.data.toJSON());
});

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = (await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    })) as string;

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
