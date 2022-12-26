const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

async function getDefinition(word) {
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const formatted = formatDefinitionReponse(response.data);
    return formatted;
  } catch (error) {
    console.error(error);
    return `There was an error while fetching a definition for the word: ${word}`;
  }
}

function formatDefinitionReponse(data) {
  if (!data) {
    return "No definition found.";
  }
  closestDefinitions = data[0];
  const word = closestDefinitions.word;
  const phonetics = closestDefinitions.phonetics.map(
    (phonetic) => phonetic.text
  );
  const partOfSpeech = closestDefinitions.meanings.map(
    (meaning) => meaning.partOfSpeech
  );
  // Maps meanings to their parts of speech.
  // TODO: Clean this up
  const definitions = closestDefinitions.meanings.map(
    (meaning) =>
      `${meaning.partOfSpeech}:\n\t${meaning.definitions
        .map(
          (definition, index) =>
            `${index + 1}. ${definition.definition}${
              definition.example ? `\n\t\t\tExample: ${definition.example}` : ``
            }`
        )
        .join("\n\t")}`
  );

  return `${word} | (${phonetics.join(", ")}) | ${partOfSpeech.join(
    ", "
  )}\n${definitions.join("\n\n")}`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("define")
    .setDescription("Defines a word.")
    .addStringOption((option) =>
      option
        .setName("word")
        .setDescription("The word to define.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const word = interaction.options.getString("word");
    const definition = await getDefinition(word);
    await interaction.reply(definition);
  },
};
