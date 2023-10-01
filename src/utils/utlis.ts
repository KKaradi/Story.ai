import { ChatBlocks } from "@/app/api/chat/route";

export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export const SettingsExtractionSeed: ChatBlocks = [
    { role: "system", content: "You are a painter. Take the current passage and extract out key terms to draw out." },
    { role: "user", content: "You are a poor scrappy young boy going through a forced labor camp collecting parts from the scrap yard when you hear the blare of elites from the upper city Yupsilos arrive. The sentries carry net rifles, tear gas, and tasers to collect citizens of the lower city for human experimentation.\n\nWhat do you do?" }, { role: "assistant", content: "Young boy hiding from sentries, net rifles, scrap yard, human, experimentation." },
    { role: "user", content: "You quickly grab the rust knife and carefully stash it away, tucking it securely into your worn-out, threadbare clothes. With a pounding heart, you quietly make your way towards a pile of rubble, carefully settling yourself in its midst, hoping to remain hidden from the elites' menacing gaze. Peering out from your hiding spot, you witness the sentries patrolling the area, their heavy boots clanking on the cold, metal ground.You notice the innocent citizens being forcefully rounded up and corralled like frightened animals.Desperation courses through your veins. As the sentries draw near, you cling to the hope that your concealment will go unnoticed.However, just as you think you've evaded capture, you hear footsteps approaching your hiding spot. Instinctively, you hold your breath and try to still the rapid beating of your heart. Will you remain hidden or take a risk and confront the sentry?" },
    { role: "assistant", content: "Young boy hides with rusty knife, innocent citizens corralled, heart" }
];

export const ImagePromptSeed: [string, string] = ["A miniature of", "green city of Zaun. Greg Rutkowski, Mark Simonetti, Tyler Edlin, intricate, scenic view, 8k resolution."]