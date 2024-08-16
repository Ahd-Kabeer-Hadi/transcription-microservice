import { Request, Response } from "express";
import { transcribeVideo } from "../services/transcriptionService";
import prisma from "../utils/prisma";



export async function createTranscription(
  req: Request,
  res: Response
) {
  try {
    const { videoUrl } = req.body;
    // @ts-ignore
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await transcribeVideo(videoUrl, userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Transcription failed" });
  }
}

export async function getTranscription(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const transcription = await prisma.transcription.findUnique({
      where: { id },
    });

    if (!transcription) {
      return res.status(404).json({ error: "Transcription not found" });
    }

    res.json(transcription);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve transcription" });
  }
}
