const { SlashCommandBuilder } = require("discord.js");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("meow")
        .setDescription("Meows at a user."),

    async execute(interaction) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const nick = interactionUser.nickname ?? interactionUser.user.username;
        await interaction.reply(`meowed at ${nick}`);
    }
}
