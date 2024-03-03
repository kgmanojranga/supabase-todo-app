import express, {Request, Response, NextFunction} from "npm:express@4.18.2";
import cors from "npm:cors@2.8.5";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const app = express();

app.use(express.json())

app.use(cors({
    optionsSuccessStatus: 200 // respond to preflight requests with 200 status
}));

app.use((req: Request, res:Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    // res.setHeader('Access-Control-Allow-Headers', 'content-type')
    // res.setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')

    next();
})

app.get("/clear-all", async (req: Request, res: Response) => {


    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract the token from Authorization header
        if (!token) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const supabase = createClient( "http://127.0.0.1:54321",
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
            { global: { headers: { Authorization: req.headers.authorization } } }
        )


        // const supabase = createClient(
        //     Deno.env.get('SUPABASE_API_LOCAL_URL') || "",
        //     Deno.env.get('SUPABASE_LOCAL_ANON_KEY') || "",
        //     { global: { headers: { Authorization: req.headers.authorization } } }
        // )

        // Decode the token payload to extract the user ID
        const {data:{user}} = await supabase.auth.getUser(token);

        // Assuming Supabase provides a method to decode the token and retrieve user information
        if (!user) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const { data } = await supabase.from('todos').select().eq('user_id', user?.id); // You may need to adjust this query based on your schema
        console.log(data);


        // await supabase.from('todos').delete().eq('user_id', user?.id);
        res.json({message: "Cleared All Todos", status: 'success'});

    } catch(error) {
        console.log(error.message)
        res.send({
            message: "Error clearing todos"
        })
    }
});

app.listen(8000);