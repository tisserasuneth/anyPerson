import { z } from "zod";

export default z.object({
    features: z.object({
        name: z.string(),
        age: z.number(),
        location: z.string(),
        job: z.string(),
        relationship_status: z.string(),
        education: z.object({
            degree: z.string(),
            field_of_study: z.string(),
            institution: z.string(),
            graduation_year: z.number(),
        }),
        hobbies: z.array(z.string()),
        languages: z.array(z.string()),
        movies: z.array(z.string()),
        tv_shows: z.array(z.string()),
        favorite_foods: z.array(z.string()),
        life_events: z.array(z.object({
            event: z.string(),
            date: z.string(),
        })),         
        goals: z.array(z.string()),
    }),
    image_description: z.string(),
});
