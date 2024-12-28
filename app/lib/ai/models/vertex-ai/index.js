import { JWT } from 'google-auth-library';
import axios from 'axios';
import Imagen from './models/imagen.js';

class VertexAI {

    static MODELS = {
        IMAGEN : Imagen,
    }

    constructor(model) {
        this.model = new model();

        this.config = {
            baseURL: 'https://us-central1-aiplatform.googleapis.com/v1/projects',
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
            keys: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
        }
    }

    async generate(input) {

        const { baseURL, keys } = this.config;
        const predictionURL = `${baseURL}/${keys?.project_id}/locations/us-central1/publishers/google/models`;
        const modelURL = `${predictionURL}/${this.model?.modelName}`;

        let MAX_RETRIES = 3;
        let currentRetry = 0;

        let data = null;
        while (currentRetry < MAX_RETRIES) {
            try {
                currentRetry++;
                const response = await axios.post(modelURL, 
                    this.model.buildPayload(input),
                    {
                        headers: {
                        'Authorization': await this.getAuthorization(),
                        'Content-Type': 'application/json',
                        }
                    }
                );

                data = response?.data;
                break;
            } catch (error) {
                if ([429, 500].includes(error?.response?.status)) {
                    currentRetry++;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } else {
                    throw error;
                }
            }
        }

        let predictions = data?.predictions;

        if (!predictions || predictions[0].raiFilteredReason) {
            throw new Error('Failed to generate a character image');
        }


        return predictions;
    }


    async getAuthorization() {

        const { keys, scopes } = this.config;
        const url = `https://dns.googleapis.com/dns/v1/projects/${keys?.project_id}`;

        const client = new JWT({
            email: keys?.client_email,
            key: keys?.private_key,
            scopes,
        });

        try {
            const tokens = await client.request({ url });
            const { Authorization } = tokens?.config?.headers;

            return Authorization;
        } catch (error) {
            throw new Error(`Error encountered while fetching access token: ${error}`);
        }
    }
}

export default VertexAI;