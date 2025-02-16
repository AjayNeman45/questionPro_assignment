import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import adminRoutes from "./routes/adminRoutes"
import userRoutes from "./routes/userRoutes"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())


app.get("/", (req, res) => { res.send("Working 🔥🔥!") })

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

export default app