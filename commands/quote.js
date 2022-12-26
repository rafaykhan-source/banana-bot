const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

const getQuote = async () => {
    try {
        const response = await axios.get("https://inspirobot.me/api?generate=true");
        return response.data;
    } catch (error) {
        console.error(error);
        return "There was an error while fetching a quote.";
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quote")
        .setDescription("Sends a random quote."),

    async execute(interaction) {
        const quote = await getQuote();
        await interaction.reply(quote);
    }
};
