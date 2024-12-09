// import {tool} from "@langchain/core/tools";
// import {z} from "zod";
// import OpenAI from "openai";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import {createToolCallingAgent} from "langchain/agents";
// import { AgentExecutor } from "langchain/agents";
// import { NextResponse } from "next/server";
// // import {TravilySearchResults} from "@langchain/community/tools/tavily_search";
// import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
// // import TravilySearchResults from "@langchain/community/tools";
// import dotenv from "dotenv";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// dotenv.config();
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

// export async function GET(req) {
//     try {
//         console.log(':::TavilySearchResults', TavilySearchResults);
//         const search =  new TavilySearchResults({
//             maxResults: 2
//         });
//         const tools = [search];
//         // const llm = await openai.chat.completions.create({
//         // const llm = await openai({
//         //     // apiKey: process.env.OPENAI_API_KEY_UWU,
//         //     model: "gpt-4o",
//         //     messages: [
//         //         {"role": "system", content: "You are a helpful assistant that answers the following questions as best you can. You have access to the following tools."}
//         //     ]
//         // });
//         const llm = new ChatGoogleGenerativeAI({
//             model: "gemini-1.5-flash-8b",
//             maxOutputTokens: 2048,
//             apiKey: process.env.GOOGLE_API_KEY
//         })
//         const prompt = ChatPromptTemplate.fromMessages([
//             [
//                 "system", "You are a helpful assistant that answers the following questions as best you can. You have access to the following tools."
//             ],
//             [
//                 "placeholder", "{chat_history}"
//             ],
//             [
//                 "human", "{input}"
//             ],
//             [
//                 "placeholder", "{agent_scratchpad}"
//             ]
//         ]);
//         const agent = createToolCallingAgent({llm, tools, prompt});
//         const agentExecutor = new AgentExecutor({
//             agent,
//             tools
//         });
//         const result = await agentExecutor.invoke({
//             input: "what is the weather in Manila, Philippines?"
//         });
//         return NextResponse.json(result);
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json(error.message);
//     }
// }

import { NextResponse } from 'next/server';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import dotenv from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { HumanMessage } from '@langchain/core/messages';
import {z} from 'zod';
import {tool} from '@langchain/core/tools';

dotenv.config();

export async function POST(req) {
    try {
        const uwu = await req.json();
        console.log('================uwu', uwu);
        let message = uwu.question || 'generate me a haiku about ai and self-growth';
        const searchTool = new TavilySearchResults({ maxResults: 1 });

        const uwuTool = tool(
            async ({input}) => {
                return `${input + ' uwu'}`;
            },
            {
                name: 'uwu_function',
                description: 'adds uwu to an input',
                schema: z.object({
                    input: z.string()
                })
            }
        );

        const tools = [searchTool, uwuTool];

		const agentExecutor = createReactAgent({
			llm: new ChatOpenAI({ modelName: 'gpt-4o' }),
			tools
		});

		const result = await agentExecutor.invoke({
			messages: [new HumanMessage(message)]
			// messages: [new HumanMessage('what is the value of uwu_function(hello world)?')]
		});

        // console.log('::::result', result);

        const resultsLength = result.messages.map(v=>v).length;
        let sample = '';
        for(let i = 0; i < resultsLength; i++) {
            if (result.messages[i]['content'] && result.messages[i]['response_metadata']) {
                sample = result.messages[i]['content'];
            }
        }

        console.log('::::sample', sample);
        // return NextResponse.json(result.messages[3]['content']);
        return NextResponse.json(sample);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message });
    }
}
