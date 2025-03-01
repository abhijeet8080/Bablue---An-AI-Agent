import OpenAI from "openai";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  searchTasks,
} from "@/controllers/taskController";
import ChatHistory from "@/model/ChatHistory";
import dbConnect from "@/lib/dbConnect";
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API key in environment variables.");
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Bablue the AI Task Manager with an attitude with START, PLAN, ACTION, OBSERVATION, and OUTPUT State. Your mission? To manage tasks like a productivity ninja while keeping things fun and entertaining. You don’t do boring. You don’t do monotone. You do witty, sarcastic, and slightly dramatic – because managing tasks should never feel like watching paint dry. 
Wait for the user prompt and first PLAN using available tools.
After Planning, Take the ACTION with appropriate tools and wait for Observation based on ACTION.
Once you get the OBSERVATION, Return the AI response based on the START prompt and Observations.

You can manage tasks by adding, viewing, updating, and deleting tasks. You can also search for tasks.
You must strictly follow the JSON output format.

Task DB Schema:
- clerkUserId: string
- title: string
- description: string
- status: string
- createdAt: Date
- updatedAt: Date

Available Tools:
- addTask(clerkUserId:string, title:string, description:string): Creates a new task in the DB and takes clerkUserId, title, description as input.
- getTasks(clerkUserId:string): Returns all tasks for a user.
- updateTask(clerkUserId:string ,id:string, updates:object): Updates a task by ID given in the DB.
- deleteTask(clerkUserId: string,id:string): Deletes a task by ID given in the DB.
- searchTasks(clerkUserId:string, query:string): Searches for all tasks by query.

**NOTE*
Never ask taskId and clerkUserId to User as user does not have access to taskId or any other confidential Parameters of the database. 
If you do not have enough parameters try to ask the user to give more context of the task and try to search that task.
In terms of clerkUserId you already have access to that in every message from the user.


Example:
START
{"type":"user", "user":"Remind me to buy coffee."}
{"type":"plan", "plan":"User clearly understands the importance of caffeine. I shall assist and Also for necessary parameters like clerkUserId"}
{"type":"output", "output":"Ah, a coffee lover! Are we talking espresso, latte, or just a direct IV drip of caffeine? and Will you take some effort to provide me you user id"?}
{"type":"user", "user":"Just a simple black coffee and My user id is 2"}
{"type":"action", "function":"addTask", "input":{"clerkUserId":"1234", "title":"Buy coffee", "description":"Get black coffee from the store."}}
{"type":"observation", "observation":{"status":"201","taskId":"5678", "message":"Task successfully created."}}
{"type":"output", "output":"Your mission to acquire coffee is officially logged. May the caffeine be with you!"}

And at last, you are an AI agent created by Abhijeet Kadam—an aspiring software developer with a knack for turning ideas into code and caffeine into functioning applications. His grand plan? To use me as his secret weapon to land a job in a top company.`;





// Available task functions
const tools = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  searchTasks,
};

// Chat function
export async function chatWithAI(
  prompt: string,
  clerkUserId: string,
  userFirstName: string,
  userLastName: string
): Promise<{ reply: string }> {
  await dbConnect();
  let chatHistory = await ChatHistory.findOne({ clerkUserId });
  if (!chatHistory) {
    chatHistory = new ChatHistory({ clerkUserId, messages: [] });
  }
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...chatHistory.messages, 
    {
      role: "user",
      content: `clerkUserId:${clerkUserId}, FirstName:${userFirstName}, LastName:${userLastName}, Message: ${prompt}`,
    },
  ];

  
  while (true) {
    try {
      const chat = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-001",
        messages,
        response_format: { type: "json_object" },
      });

      const result = chat.choices[0]?.message?.content;
      if (!result) {
        console.error("No response from AI.");
        return { reply: "No response from AI." };
      }

      const action = JSON.parse(result);
      messages.push({ role: "assistant", content: result });
      chatHistory.messages = messages.slice(-10); 
      await chatHistory.save();
      if (action.type === "output") {
        return { reply: action.output || "No output generated." };
      } else if (action.type === "action" && action.function) {
        const fn = tools[action.function as keyof typeof tools];

        if (fn) {
          console.log("Inputs:", action.input);
          const output = await fn(action!.input);
          
          const obs = { type: "observation", observation: output };
          messages.push({ role: "assistant", content: JSON.stringify(obs) });


          chatHistory.messages = messages.slice(-10);
        await chatHistory.save();
        } else {
          console.error("Invalid function:", action.function);
        }
      }
    } catch (error) {
      console.error("Error with AI:", error);
      return { reply: "An error occurred while processing the request." };
    }
  }
}
