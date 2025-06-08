const { MessageFlags } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
            if(!interaction.isChatInputCommand()) return
        
            const command = interaction.client.commands.get(interaction.commandName)
        
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                
                // Only respond if we haven't already responded to avoid duplicate replies
                try {
                    if (interaction.replied || interaction.deferred) {
                        await interaction.followUp({ 
                            content: 'There was an error while executing this command!', 
                            flags: MessageFlags.Ephemeral 
                        });
                    } else {
                        await interaction.reply({ 
                            content: 'There was an error while executing this command!', 
                            flags: MessageFlags.Ephemeral 
                        });
                    }
                } catch (interactionError) {
                    // If we can't respond to the interaction, just log it
                    console.error('Failed to respond to interaction:', interactionError);
                }
            }
        }
};