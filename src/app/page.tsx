'use client'

import Input from '@/components/Input';
import StoryDisplay from '@/components/StoryDisplay'
import { storyAConfig } from '@/utils/StoryTemplate';
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react';
import { ChatBlocks } from './api/chat/route';
import LoadingBall from '@/components/LoadingBall';
import { ChatCompletionMessage } from 'openai/resources/chat/index.mjs';
import { ImagePromptSeed, SettingsExtractionSeed } from '../utils/utlis'


async function generateNewStoryBlock(setStoryBlocks: Dispatch<SetStateAction<ChatBlocks>>, setAwaitingStoryBlocks: Dispatch<SetStateAction<boolean>>, storyWithUserInput: ChatBlocks,) {
  try {
    setAwaitingStoryBlocks(true);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story: storyWithUserInput }),
    });

    const returnedStory = (await response.json()) as ChatBlocks;
    setAwaitingStoryBlocks(false);
    setStoryBlocks(returnedStory);
    return returnedStory.slice(-1)[0].content;

  } catch (e: any) {
    console.error('chat request failed with error: ', e);
  }
}

function settingsExtractionsToPrompt(settingsExtraction: string) {
  return (ImagePromptSeed[0] + " " + settingsExtraction + " " + ImagePromptSeed[1]);

}

async function generateNewImageUrl(setAwaitingImage: Dispatch<SetStateAction<boolean>>, newStoryResponse: string, setImageURL: Dispatch<SetStateAction<string>>) {
  let prompt = "";
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story: [...SettingsExtractionSeed, { role: "user", content: newStoryResponse }] }),
    });
    const resultantJSON = await response.json();
    const settingsExtraction = (resultantJSON as ChatBlocks).slice(-1)[0].content?.slice(0, 90);
    prompt = settingsExtractionsToPrompt(settingsExtraction ?? "");
  } catch (e: any) {
    console.error('chat request failed with error: ', e)
  }

  try {
    setAwaitingImage(true);
    const response = await fetch("/api/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const resultantURL = (await response.json()).url as string;
    setAwaitingImage(false);
    setImageURL(resultantURL);
  } catch (e: any) {
    console.error('image request failed with error: ', e)
  }
}

export default function Home() {

  const [storyBlocks, setStoryBlocks] = useState(storyAConfig.storySeed);
  const [imageURL, setImageURL] = useState(storyAConfig.imageSeedURL);
  const [awaitingImage, setAwaitingImage] = useState(false);
  const [awaitingStoryBlocks, setAwaitingStoryBlocks] = useState(false);

  async function submitHandler(input: string | undefined) {
    if (awaitingStoryBlocks)
      return;

    const storyWithUserInput = [...storyBlocks, { role: "user", content: input ?? "" } as ChatCompletionMessage]
    setStoryBlocks(storyWithUserInput);

    if (awaitingImage)
      return;

    const newStoryResponse = await generateNewStoryBlock(setStoryBlocks, setAwaitingStoryBlocks, storyWithUserInput) ?? "";
    generateNewImageUrl(setAwaitingImage, newStoryResponse, setImageURL);

  }

  return (
    <main>
      <div className='flex'>
        <div className='w-6/12 pl-10 pt-10 py-5 flex flex-col-reverse items-end"'>
          <Input submitHandler={submitHandler} />
          <div className='flex justify-end w-11/12'>
            <LoadingBall isLoading={awaitingStoryBlocks} loadingText='Generating Response' />
          </div>
          <StoryDisplay story={storyBlocks} />
        </div>
        <div className='w-6/12 p-10 flex justify-center flex-col'>
          <Image
            src={imageURL}
            width={800}
            height={800}
            className='rounded-xl'
            alt="Picture of the author"
          />
          <div className='h-2' />
          <LoadingBall isLoading={awaitingImage} loadingText='Generating Image' />
        </div>
      </div>
    </main>
  )
}
