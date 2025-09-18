# Questions Answered

This is an application provides a CLI to ask questions to a chosen LLM provider. It is meant to be run on Node 22 or higher.

Node v22.14.0, Express v5.1.0

## To run application

1. Clone the repo locally
2. `npm install`
3. `npm run start`



# Env Variables

```
ANTHROPIC_API_KEY=InsertYourAPIKeyHere
CHATGPT_API_KEY=InsertYourAPIKeyHere
GEMINI_API_KEY=InsertYourAPIKeyHere
DEFAULT_ENGINE=gemini
```


This is currently only able to use Gemini (free or paid) but can be updated to use multiple providers.


# To do

Add in testing
Add in Anthropic