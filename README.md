# STORY AI

Story AI is a ai dungeon inspired role playing game with a diffusion art model twist

## Getting Started

First, run the development server:

Create a .env file and include the following:
```
REPLICATE_API_TOKEN
IMAGE_DEBUG
CHAT_DEBUG
OPEN_AI_API_TOKEN
```
Then run 
```bash
npm run dev
```

## How to play
The roleplaying is quite simple. The application puts you drops you into the story of a young boy caught in the oppression of the upper cities wrath, scraping together to survive with his inventiveness and wit. To play simply type your response and the dungeon master will generate a custom story. Every minute a new image will be generated to give an artistic depiction of where you are in the story.

# How it works
### Tech stack:
Next.js
Tailwinds

### Libraries 
Openai
Replicate

### Story and Image Generation
The story is generated using chat gpt. Every time chat gpt generates a new scenen using few shot prompting the scene is fed into another chat gpt conversation to extract out key setting elements. These key setting elements are then combined with prompt engineering elements and then fed into a disco diffusion model to finally generate new images.

### Future plans
![Future Plans Documentation](https://i.imgur.com/Mvj9zJ8.png)

In the future the role playing aspect of the game would be far more complex creating a choose your own adventure where your choices are limited leading to more creativity.

First the chat gpt would generate a scene then 100 possible options reactions to that scene. A seperate conversation would rate the risk of each option with the help of few shot prompting.

Second the user is presented with an text box. Using vector embeddings of the 100 options and a vector embedding of the users input we would select the most similar option and submit it.

Then using a die and taking in the risk of the option the chat gpt would continue the story depending on wheather the option was successful or not.


### Demo Video
https://youtu.be/WXEpF_InRyw