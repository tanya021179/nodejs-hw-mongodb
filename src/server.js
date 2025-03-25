import express from "express";
import cors from "cors";
import pino from "pino-http";

const PORT = 3000;

export const setupServer = () => {
    
    const app = express();
    
    app.use(express.json());
    app.use(cors());
    
   app.use(pino());

    app.get("/", (request, response) => {
        response.json({
            message: "Hello world!",
        });
    });

    app.use((request, response) => {
        response.status(404).json({
            message: "Not found"
        });
    });

    app.listen(PORT, () => {
        console.log(`"Server is running on port ${PORT}"`);
    });
};

// export default setupServer;







