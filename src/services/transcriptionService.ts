import speech_v1,{  protos as speechProtos } from '@google-cloud/speech';
import { TranslationServiceClient } from '@google-cloud/translate';
import ytdl from 'ytdl-core';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const speechClient = new speech_v1.SpeechClient();
const translationClient = new TranslationServiceClient();

export async function transcribeVideo(videoUrl: string, userId: string) {
  // const userId = req.user?.id; need user id
  try {
    console.log('videoUrl', videoUrl);
    
    const audioStream = ytdl(videoUrl, { filter: 'audioonly' });

    const audioBuffer = await streamToBuffer(audioStream);

    const [languageResponse] = await translationClient.detectLanguage({
      content: audioBuffer.toString('base64'),
      parent: `projects/${process.env.GOOGLE_CLOUD_PROJECT_ID}`,
    });

    const detectedLanguage = languageResponse.languages![0].languageCode;

    const [response] = await speechClient.recognize({
      audio: { content: audioBuffer.toString('base64') },
      config: {
        encoding: speechProtos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.LINEAR16,
        sampleRateHertz: 16000,
        languageCode: detectedLanguage,
      },
    });

    const transcription = response.results!
      .map(result => result.alternatives![0].transcript)
      .join('\n');

    await prisma.transcription.create({
      data: {
        videoUrl,
        transcript: transcription,
        language: detectedLanguage,
        userId,
      },
    });

    return { transcription, language: detectedLanguage };
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Transcription failed');
  }
}

function streamToBuffer(stream: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on('data', (chunk: any) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}
