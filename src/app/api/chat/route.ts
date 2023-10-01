import { sleep } from "@/utils/utlis";
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";
import { ChatCompletionMessage } from "openai/resources/chat/index.mjs";


const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_TOKEN });

export type ChatBlocks = ChatCompletionMessage[];


const DEBUG = process.env.CHAT_DEBUG === "TRUE";

export async function POST(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const story = (await req.json()).story as ChatBlocks;
    if (DEBUG) {
        await sleep(1000 * 3);
        story.push({ role: "assistant", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut pulvinar tellus. Praesent mollis magna nec mauris mattis, et imperdiet diam vulputate. Morbi ac nibh at dolor fringilla sagittis sed et tortor. Nam dapibus ipsum et risus faucibus suscipit. Suspendisse ut neque nisl. Ut non laoreet urna, vel vestibulum diam. Praesent urna neque, iaculis at odio eu, mollis vehicula sem. Curabitur ut blandit leo. Vestibulum elit risus, blandit quis pharetra et, convallis vel tellus. Nullam elementum arcu vitae vulputate lobortis. Integer scelerisque libero eros, eget rhoncus odio consectetur ut. Mauris dapibus vitae nunc et ultricies. Nullam id arcu laoreet, tempor dolor non, rutrum enim. Vestibulum congue enim velit, sit amet hendrerit eros faucibus sit amet." })
        return new Response(JSON.stringify(story), { status: 200 })
    } else {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: story,
        }); story.push(
            completion.choices[0].message ?? { role: "assistant", content: "" }
        );
        return new Response(JSON.stringify(story), { status: 200 })
    }

}

