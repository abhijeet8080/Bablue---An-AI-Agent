import { chatWithAI } from "@/controllers/chatController";

export async function POST(req: Request) {
  try {
    const { message, user } = await req.json();
    const response = await chatWithAI(message,user.id,user.firstName,user.lastName);
    return Response.json({ reply: `${response.reply}` }, { status: 200 });
  } catch (error) {
    console.log("Error: " ,error)
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}


// Add a GET handler to handle browser requests
export async function GET() {
  return Response.json({ message: "Welcome to the AI Chat API!" }, { status: 200 });
}