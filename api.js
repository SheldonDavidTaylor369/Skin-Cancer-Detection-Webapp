import axios from "axios";
import fs from "fs";

import dotenv from 'dotenv';
dotenv.config();


const sendImage = async (imagepath) => {
    try {
        const image = fs.readFileSync(imagepath, {
            encoding: "base64"
        });

        const response = await axios({
            method: "POST",
            url: "https://classify.roboflow.com/skin-cancer-detection-wfldq/3",
            params: {
                api_key: const apiKey = process.env.API_KEY;
                         const anotherApiKey = process.env.ANOTHER_API_KEY;

                         console.log('API Key:', apiKey);
                         console.log('Another API Key:', anotherApiKey);

            },
            data: image,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        return(response.data);
    } catch (error) {
        return(error.message);
    }
};



export default sendImage;
