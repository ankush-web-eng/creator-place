import * as z from 'zod';

export const VerifySchema = z.object({
    instagram: z.string(),
    youtube: z.string().optional()
});