import {tool} from '@langchain/core/tools';
import { HumanMessage } from '@langchain/core/messages';
import {z} from 'zod';
import { ChatOpenAI } from '@langchain/openai';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { StateGraph, StateGraphArgs } from '@langchain/langgraph';
import { MemorySaver, Annotation } from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { NextResponse } from 'next/server';
import dotenv from "dotenv";

dotenv.config();