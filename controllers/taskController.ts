import dbConnect from "@/lib/dbConnect";
import TaskModel from "@/model/Task";
import mongoose from "mongoose";

// Define Types for Task Object
enum TaskStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  IN_PROGRESS = "in_progress",
}

interface TaskData {
  clerkUserId: string;
  title: string;
  description: string;
  status?: TaskStatus; 
}

interface TaskUpdateData {
  clerkUserId:string;
  id: string;
  updates: Partial<TaskData>;
}

interface SearchParams {
  clerkUserId: string;
  query: string;
}

// 📌 Add New Task
export const addTask = async ({ clerkUserId, title, description, status = TaskStatus.PENDING }: TaskData) => {
  try {
    await dbConnect();

    const task = await TaskModel.create({ clerkUserId, title, description, status });


    return { status: 201, taskId: task._id!.toString(), message: "Task successfully created." };
  } catch (error) {
    console.error("Error in ADD Task:", error);
    return { status: 500, error: (error as Error).message || "Error creating task" };
  }
};

// 📌 Get All Tasks for a User
export const getTasks = async ({ clerkUserId }: { clerkUserId: string }) => {
  try {
    await dbConnect();


    if (typeof clerkUserId !== "string") {
      throw new Error("Invalid clerkUserId format. Expected a string.");
    }

    const tasks = await TaskModel.find({ clerkUserId }).sort({ createdAt: -1 });

    return { status: 200, tasks };
  } catch (error) {
    return { status: 500, error: (error as Error).message || "Error fetching tasks" };
  }
};

// 📌 Update Task
export const updateTask = async ({ clerkUserId, id, updates }: TaskUpdateData) => {

  try {
    await dbConnect();


    // Check if the task exists and belongs to the logged-in user
    const task = await TaskModel.findOne({ _id: id,  clerkUserId });

    if (!task) {
      return { status: 404, message: "Task not found or you are not authorized to update it." };
    }

    // Update the task
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    return {
      status: 200,
      taskId: updatedTask!._id!.toString(),
      message: "Task successfully updated.",
    };
  } catch (error) {
    console.log("Error in Update Task:", error);
    return { status: 500, error: (error as Error).message || "Error updating task" };
  }
};
// 📌 Delete Task
export const deleteTask = async ({clerkUserId,id}:{clerkUserId: string,id: string}) => {
  try {
    await dbConnect();

    const objectId = new mongoose.Types.ObjectId(id);

    // Find the task first
    const task = await TaskModel.findOne({ _id: objectId, clerkUserId });

    if (!task) {
      return { status: 404, message: "Task not found or unauthorized" };
    }

    // Delete the task if it belongs to the user
    await TaskModel.findByIdAndDelete(objectId);

    return { status: 200, message: "Task deleted successfully" };
  } catch (error) {
    console.log("Error in Delete Task:", error);
    return { status: 500, error: (error as Error).message || "Error deleting task" };
  }
};


// 📌 Search Tasks
export const searchTasks = async ({ clerkUserId, query }: SearchParams) => {
  try {
    await dbConnect();


    const tasks = await TaskModel.find({
      clerkUserId,
      title: { $regex: query, $options: "i" },
    }).sort({ createdAt: -1 });

    return { status: 200, tasks };
  } catch (error) {
    console.log("Error in Search Task:", error);
    return { status: 500, error: (error as Error).message || "Error searching tasks" };
  }
};
