import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {

    //const result= await db.select().from(users).where(eq(users.id,2));

    const result = await db.query.users.findFirst({
        with:{
            profile:true,
        }
    })

    return new Response(JSON.stringify(result));

}