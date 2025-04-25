import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API prefix
  const apiPrefix = "/api";

  // Contact form submission
  app.post(`${apiPrefix}/contact`, async (req: Request, res: Response) => {
    try {
      // Validate the request data using the schema
      const messageData = insertMessageSchema.parse(req.body);
      
      // Store the message
      const newMessage = await storage.createMessage(messageData);
      
      // Return success
      return res.status(201).json({
        success: true,
        message: "Message received successfully",
        data: {
          id: newMessage.id,
          createdAt: newMessage.createdAt
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, message: "Invalid form data", errors: error.errors });
      }
      
      console.error("Error processing contact form:", error);
      return res.status(500).json({ success: false, message: "Failed to process your message" });
    }
  });

  // Admin route to get all messages (would typically require authentication)
  app.get(`${apiPrefix}/admin/messages`, async (req: Request, res: Response) => {
    try {
      const messages = await storage.getAllMessages();
      return res.json({ success: true, data: messages });
    } catch (error) {
      console.error("Error fetching messages:", error);
      return res.status(500).json({ success: false, message: "Failed to fetch messages" });
    }
  });

  // Admin route to mark a message as read (would typically require authentication)
  app.patch(`${apiPrefix}/admin/messages/:id/read`, async (req: Request, res: Response) => {
    try {
      const messageId = parseInt(req.params.id);
      
      if (isNaN(messageId)) {
        return res.status(400).json({ success: false, message: "Invalid message ID" });
      }
      
      const updatedMessage = await storage.markMessageAsRead(messageId);
      
      if (!updatedMessage) {
        return res.status(404).json({ success: false, message: "Message not found" });
      }
      
      return res.json({ success: true, data: updatedMessage });
    } catch (error) {
      console.error("Error marking message as read:", error);
      return res.status(500).json({ success: false, message: "Failed to update message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
