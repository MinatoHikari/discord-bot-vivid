import {
  SlashCommandBuilder,
  Integration,
  ChatInputCommandInteraction,
  Client,
  Collection,
} from "discord.js";

export type Command = {
  data: SlashCommandBuilder;
  execute: Awaited<
    (
      interaction: Integration | ChatInputCommandInteraction,
      client?: EnhanceClient
    ) => void
  >;
};

export type EnhanceClient = {
  commands?: InstanceType<typeof Collection>;
} & InstanceType<typeof Client>;
