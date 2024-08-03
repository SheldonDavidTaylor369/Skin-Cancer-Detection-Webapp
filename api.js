import axios from "axios";
import fs from "fs";

const sendImage = async (imagepath) => {
    try {
        const image = fs.readFileSync(imagepath, {
            encoding: "base64"
        });

        const response = await axios({
            method: "POST",
            url: "https://classify.roboflow.com/skin-cancer-detection-wfldq/3",
            params: {
                api_key: "DLJ5cqTwsYzXxBITPD61"
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
