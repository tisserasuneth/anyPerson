import { z } from "zod";

export default z.object({
    name: z.string(),
    age: z.string(),
    location: z.string(),
    imageDescription: z.string(),
    summary: z.string(),
});