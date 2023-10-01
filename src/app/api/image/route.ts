import { sleep } from "@/utils/utlis";
import { NextApiRequest, NextApiResponse } from "next";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN ?? "",
});

const DEBUG = process.env.IMAGE_DEBUG === "TRUE";
const debugImageSet = ["https://i.imgur.com/RxgWvCt.jpeg", "https://i.imgur.com/uY24Urr.png", "https://i.imgur.com/z9QMPdO.jpeg", "https://i.imgur.com/LkpGYcE.jpeg", "https://i.imgur.com/NxSdMdd.jpeg"];



export async function POST(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prompt = (await req.json()).prompt
    if (DEBUG) {
        await sleep(1000 * 3);
        return new Response(JSON.stringify({ url: debugImageSet[Math.floor(Math.random() * debugImageSet.length)] }), { status: 200 });
    } else {
        console.log('Generating Image');
        const output = await replicate.run(
            "nightmareai/disco-diffusion:3c128f652e9f24e72896ac0b019e47facfd6bccf93104d50f09f1f2196325507",
            {
                input: {
                    steps: 50,
                    prompt: prompt,
                    width: 600,
                    height: 600,
                    diffusion_model: "256x256_diffusion_uncond",
                    ViTB32: true,
                    ViTB16: true,
                    RN50: true,
                    use_secondary_model: true,
                    clip_guidance_scale: 5000,
                    tv_scale: 0,
                    range_scale: 150,
                    sat_scale: 0,
                    cutn_batches: 4,
                    init_scale: 996,
                    target_scale: 20000,
                    skip_steps: 10,
                    display_rate: 34,
                }
            }
        ) as string[];
        const finalImage = output.slice(-1)[0];
        return new Response(JSON.stringify({ url: finalImage }), { status: 200 })
    }
}
