import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-store, no-cache',
      },
    });
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};
