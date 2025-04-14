import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getJobs, getJobById, createJob, updateJob, deleteJob } from "./api/jobs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Jobs API routes
  app.get('/api/jobs', getJobs);
  app.get('/api/jobs/:id', getJobById);
  app.post('/api/jobs', createJob);
  app.put('/api/jobs/:id', updateJob);
  app.delete('/api/jobs/:id', deleteJob);

  // Authentication routes (basic for demo purposes)
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    // Simple authentication check (in a real app, this would use proper auth)
    if (username === 'admin' && password === 'admin123') {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
