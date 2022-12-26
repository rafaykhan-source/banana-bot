const { SlashCommandBuilder } = require("discord.js");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("peep")
        .setDescription("Replies with Peep!"),

    async execute(interaction) {
        await interaction.reply("Peep!");
    }
}
