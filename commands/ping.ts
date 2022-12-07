import { SlashCommandBuilder, CommandInteraction } from "discord.js";

const ping = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction: CommandInteraction) {
    await interaction.reply("别Ping了，傻卵");
  },
};

export default [ping];
