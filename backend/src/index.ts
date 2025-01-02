import express from 'express';
import cors from 'cors';

import http from "http";

import prisma from "./prisma";

import routes from './routes/sevak';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({
    credentials: true,
    origin: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

app.use("/api", routes);

const server = http.createServer(app);


const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected Successfully");

        const PORT = process.env.PORT || 8000;
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (e) {
        console.log("Error connecting to database", e);
    }
};

startServer();

