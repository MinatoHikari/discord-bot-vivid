import {
  SlashCommandBuilder,
  CommandInteractionOptionResolver,
  CommandInteraction,
} from "discord.js";
import { EnhanceClient } from "../types";
import { prisma } from "../prisma";

const userId = {
  data: new SlashCommandBuilder()
    .setName("userid")
    .setDescription("get user Id"),
  async execute(interaction: CommandInteraction) {
    await prisma.user.create({
      data: {
        id: interaction.user.id,
        username: interaction.user.username,
      },
    });
    await interaction.reply(interaction.user.id);
  },
};

const banUser = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("ban user")
    .addUserOption((opt) => {
      return opt.setName("user").setDescription("input user to ban");
    }),
  async execute(interaction: CommandInteraction, client?: EnhanceClient) {
    const permission = interaction.guild?.members.me?.permissions;
    const userHasPermission = permission?.has("BanMembers");
    let target = interaction.options.getUser("user");

    if (target && userHasPermission) {
      interaction.guild?.members.ban(target);
      await interaction.reply(`${target.username} 被Ban`);
      return;
    }
    if (!userHasPermission) {
      await interaction.reply(`权限不足`);
      return;
    }
    await interaction.reply(`找不到用户`);
  },
};

const unBanUser = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("unban user")
    .addStringOption((opt) => {
      return opt
        .setName("name")
        .setDescription("input user to unban")
        .setRequired(true);
    }),
  async execute(interaction: CommandInteraction) {
    const permission = interaction.guild?.members.me?.permissions;
    const userHasPermission = permission?.has("BanMembers");
    const target = (
      interaction.options as CommandInteractionOptionResolver
    ).getString("name");
    const bans = await interaction.guild?.bans.fetch();
    const targetUser = bans?.find((i) => i.user.username === target)?.user;

    if (targetUser && userHasPermission) {
      interaction.guild?.members.unban(targetUser.id);
      await interaction.reply(`${targetUser.username} 已经解Ban`);
      return;
    }
    if (!userHasPermission) {
      await interaction.reply(`权限不足`);
      return;
    }
    await interaction.reply(`找不到用户`);
  },
};

export default [userId, banUser, unBanUser];
