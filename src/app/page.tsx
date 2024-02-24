import { db } from "@/db";
import { departments } from "@/db/schema";
import  TreeComponent  from "@/components/TreeView"

function buildHierarchy(items, parentId) {
  let result = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].parentId === parentId) {
      let children = buildHierarchy(items, items[i].id);
      if (children.length > 0) {
        items[i].children = children;
      }
      result.push(items[i]);
    }
  }
  return result;
}


export default async function Home() {

  const result= await db.select().from(departments);
  const hierarchicalData = buildHierarchy(result, null);
  
   return (  
    <main>
      <TreeComponent data={hierarchicalData} />
    </main>
  );
}
