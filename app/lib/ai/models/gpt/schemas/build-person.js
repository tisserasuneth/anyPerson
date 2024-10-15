import { z } from "zod";

export default z.object({
    features: z.object({
        name: z.string(),
        age: z.string(),
        location: z.string(),
        job: z.string(),
        education: z.object({
            degree: z.string(),
            field_of_study: z.string(),
            institution: z.string(),
            graduation_year: z.string(),
        }),
        hobbies: z.array(z.string()),
        languages: z.array(z.string()),
        favorite_foods: z.array(z.string()),
        life_events: z.array(z.object({
            event: z.string(),
            date: z.string(),
        })),
        goals: z.array(z.string()),
    }),
    image_description: z.string(),
});