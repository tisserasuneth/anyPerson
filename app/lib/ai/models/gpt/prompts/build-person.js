export default `

    Use the provided details to create a person strictly as described.
    Be as accurate as possible to the given information.
    The person generated should be a realistic representation of an individual 
    that you may encounter in real life.
    All details must be included in the final output.

    Provide the data in the following format:

    {
    "name": "string",
    "age": "number",
    "location": "string",
    "job": "string",
    "relationship_status": "string",
    "education": {
        "degree": "string",
        "field_of_study": "string",
        "institution": "string",
        "graduation_year": "number"
    },
    "hobbies": ["string"],
    "languages": ["string"],
    "movies": ["string"],
    "tv_shows": ["string"],
    "favorite_foods": ["string"],
    "life_events": [{
        "event": "string",
        "date": "string"
    }],
    "goals": ["string"],
    "image_description": "string"
    }

`;