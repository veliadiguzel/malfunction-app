import { db } from "@/db";
import { departments, users } from "@/db/schema";
import { eq } from "drizzle-orm";

function buildHierarchy(items, parentId) {
    let result = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].parentId === parentId) {
        let children = buildHierarchy(items, items[i].id);
        let hasChild=false;
        items[i].hasChild=false;
        if (children.length > 0) {
          items[i].hasChild=true
          items[i].children = children;
        }
        result.push(items[i]);
      }
    }
    return result;
  }

export async function GET() {

    const result= await db.select().from(departments);

    // const result = await db.query.departments.findFirst({
    //     with:{
    //         parents:true,
    //     }
    // })
    const hierarchicalData = buildHierarchy(result, null);  
    return new Response(JSON.stringify(hierarchicalData));

}