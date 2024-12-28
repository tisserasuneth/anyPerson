class Imagen {

    get modelName(){
        return "imagen-3.0-generate-001:predict";
    }

    buildPayload(input){
        return {
                "instances": [
                    {
                        "prompt": input?.prompt,
                    },
                ],
                "parameters": {
                    "sampleCount": 1,
                    "aspectRatio": "1:1",
                    "includeRaiReason": true,
                    "outputOptions": {
                        "mimeType": "image/png",
                    },
                },
            };
    }
}

export default Imagen;
