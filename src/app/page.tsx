import { db } from "@/db";
import { departments } from "@/db/schema";
import  TreeComponent  from "@/components/TreeView"

function buildHierarchy(items, parentId) {
  let result = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].parentId === parentId) {
      let children = buildHierarchy(items, items[i].id);
      let hasChild=false;
      let open:false;
      items[i].open=true;
      items[i].hasChild=false;
      if (children.length > 0) {
        items[i].hasChild=true;
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
    <div className="min-h-screen flex flex-col bg-yellow-100">
    {/* Navbar */}
    <nav className="bg-yellow-950 p-4 w-full">
      <div className="flex items-center justify-between">
        {/* Logo ve İsim */}
        <div className="flex items-center space-x-4">
          <img src="/kroman.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-yellow-100 text-lg font-bold">Kroman Çelik</span>
        </div>
        {/* Oturum Açma Kısmı */}
        <div className="flex items-center space-x-4">
          <a href="#" className="text-yellow-100">Oturum Aç</a>
          {/* Diğer bağlantılar ve düğmeler buraya eklenebilir */}
        </div>
      </div>
    </nav>

    {/* Ana İçerik */}
    <div className="relative">
    <main className="flex felx-start">
      {/* Ana içerik buraya eklenebilir */}
      <TreeComponent data={hierarchicalData} />
    </main>
    </div>
  </div>
  );
}
