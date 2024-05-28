const app =require('./app');
const connectDB = require('./database/database');

const port= process.env.PORT  || 5000

app.listen(port, async()=>{
    await connectDB();
    console.log(`server is listening on ${port}`);
})