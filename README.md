# Questions Answered

This is an application provides a CLI to ask questions to a chosen LLM provider. It is meant to be run on Node 22 or higher.

Node v22.14.0, Express v5.1.0

## To run application

1. Clone the repo locally
2. `npm install`
3. Put your Gemini API Key in the `GEMINI_API_KEY` variable in a `.env` file in the root directory
4. `npm run start`



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


# Description

This is a thought experiment on making a CLI interface to use multiple GPT engines. The back end consists of an API so that it could easily be used by multiple services or expanded to meet the needs of multiple tools. It is usable, extensible, and can be plugged into any system.
