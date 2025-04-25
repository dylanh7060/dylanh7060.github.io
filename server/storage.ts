import { db } from "@db";
import { messages, insertMessageSchema, type InsertMessage, type Message } from "@shared/schema";
import { desc, eq } from "drizzle-orm";

export const storage = {
  createMessage: async (messageData: InsertMessage): Promise<Message> => {
    // Validate the message data using the schema
    const validatedData = insertMessageSchema.parse(messageData);
    
    // Insert the message into the database
    const [newMessage] = await db.insert(messages)
      .values(validatedData)
      .returning();
    
    return newMessage;
  },
  
  getAllMessages: async (): Promise<Message[]> => {
    // Get all messages ordered by most recent first
    return await db.query.messages.findMany({
      orderBy: [desc(messages.createdAt)]
    });
  },
  
  getMessageById: async (id: number): Promise<Message | undefined> => {
    // Get a specific message by ID
    return await db.query.messages.findFirst({
      where: eq(messages.id, id)
    });
  },
  
  markMessageAsRead: async (id: number): Promise<Message | undefined> => {
    // Mark a message as read
    const [updatedMessage] = await db
      .update(messages)
      .set({ read: true })
      .where(eq(messages.id, id))
      .returning();
    
    return updatedMessage;
  }
};
