export default `
    Use the provided details to create a person strictly as described.
    Be as accurate as possible to the given information.
    The person generated should be a realistic representation of an individual 
    that you may encounter in real life.
    All details must be included in the final output.

    Be creative, use actual names, locations, and events to make the person.
    Instead of using something generic like "John Doe" or "John Smith" use realistic names.

    Make sure life events and goals are relevant to the person's age and background.
    Each item should correlate with the person's age, location, and job.

    Provide the data in the following format:

    {
    "name": "string",
    "age": "string",
    "location": "string",
    "job": "string",
    "education": {
        "degree": "string",
        "fieldOfStudy": "string",
        "institution": "string",
        "graduationYear": "string" (YYYY Format),
    },
    "hobbies": ["string"],
    "languages": ["string"],
    "favoriteFoods": ["string"],
    "lifeEvents": [{
        "event": "string",
        "date": "string" (DD-MM-YYYY Format),
    }],
    "goals": ["string"],
    "imageDescription": "string"
    }
`;