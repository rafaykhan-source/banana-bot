const { SlashCommandBuilder } = require("discord.js");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("monke")
        .setDescription("Sends a picture of a monke."),

    async execute(interaction) {
        await interaction.reply("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJzIUOGP6YlyhlLxMJ_t4_tcl28-tTXJI2_8_Q%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1&ipt=1f62035dca7d002e31bf422c84ec31cf3b0f5212aefe50a25452b293a7a70229&ipo=images");
    }
}
