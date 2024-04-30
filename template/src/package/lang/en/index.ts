export default {
    header: {
        left: {
            search_model: "Search model...",
            local_model: "Local",
            remote_model: "Remote",
            new_remote_model: "New remote devices"
        },
        tab: {
            chat: "Chat",
            workflow: "Workflow",
            agent: "Agent",
            database: "Database",
            extension: "Extension"
        },
        account: {
            menu: {
                profile: "Profile",
                billing: "Billing",
                settings: "Settings",
                logout: "Log out"
            }
        }
    },
    chat: {
        new: "New Conversation",
        time: {
            today: "Today",
            history: "History",
            search: "Select search time range..."
        },
        search: {
            placeholder: "Search keywords..."
        },
        form: {
            placeholder: "Message AI...",
            button: "Send Message"
        },
        configuration: {
            workflow: {
                title: "Workflow",
                placeholder: "Select the workflow to use...",
                tips: "Use custom workflows in conversations to handle more complex tasks through powerful workflow processing."
            },
            model: {
                title: "Model",
                placeholder: "Select the model to use...",
                tips: "Specify the dialogue model to use based on your needs and scenario in the conversation."
            },
            settings: {
                title: "Settings",
                presets: {
                    creative: "Creative",
                    balanced: "Balanced",
                    precise: "Precise"
                },
                temperature: {
                    title: "Temperature",
                    tips: "Controls randomness: lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive."
                },
                maxlength: {
                    title: "Max Tokens",
                    tips: "The maximum number of tokens to generate shared between the prompt and completion. The exact limit varies by model. (One token is roughly 4 characters for standard English text)"
                },
                top_p: {
                    title: "Top P",
                    tips: "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered."
                },
                frequency_penalty: {
                    title: "Frequency penalty",
                    tips: "How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim."
                },
                presence_penalty: {
                    title: "Presence penalty",
                    tips: "How much to penalize new tokens based on whether they appear in the text so far. Increases the model's likelihood to talk about new topics."
                }
            }
        }
    },
    install: {
        title: "Quick Start",
        description: "Choose a method to quickly start your AI assistant.",
        tab: {
            local: {
                title: "Local",
                placeholder: "Select a location to store data",
                heads_up: "Heads up!!!",
                tips: "Local large model resources take up significant space. Ensure enough storage is available, recommended ≥ 30GB.",
                button: "Start installation and deployment"
            },
            remote: {
                title: "Remote",
                placeholder: "Enter the domain name or IP address",
                heads_up: "Heads up!!!",
                tips: "Ensure the remote device has the large model service installed, or visit the official site for installation instructions.",
                button: "Connect to Remote Device"
            }
        }
    },
    toast: {
        20001: "Incomplete information, please check."
    }
}