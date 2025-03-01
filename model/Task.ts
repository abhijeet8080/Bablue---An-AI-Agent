import mongoose, { Schema, Document } from "mongoose";

enum TaskStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    IN_PROGRESS = "in_progress"
}

export interface ITask extends Document {
    clerkUserId: string;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt?: Date;
}

const TaskSchema: Schema = new Schema<ITask>({
    clerkUserId: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: String, required: true, enum: Object.values(TaskStatus), default: TaskStatus.PENDING },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const TaskModel = mongoose.model<ITask>("Task", TaskSchema);
export default TaskModel;
