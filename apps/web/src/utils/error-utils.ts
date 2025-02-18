import axios from 'axios';

export async function parseError(
  err: any,
): Promise<{ error: { message: string } }> {
  if (axios.isAxiosError(err)) {
    return { error: { message: err.response?.data?.message } };
  } else {
    return { error: { message: 'Oops! Action Failed..' } };
  }
}
