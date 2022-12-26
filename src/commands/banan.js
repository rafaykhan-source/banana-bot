const { SlashCommandBuilder } = require("discord.js");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("banan")
        .setDescription("Sends a picture of a banan."),

    async execute(interaction) {
        await interaction.reply("NOT IMPLEMENTED");
    }
}
