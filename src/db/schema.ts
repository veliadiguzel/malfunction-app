import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";


export const users=pgTable("users",{
    id:serial("id").primaryKey(),
    userName:text("user_name"),
    fullName:text("full_name"),
    deparmentId:integer("department_id").default(0).references(()=>departments.id)
});

export const userRelations=relations(users,({one}) => ({
    profile : one(profiles,{
        fields:[users.id],
        references:[profiles.userId]
    }),
    department: one(departments,{
        fields: [users.deparmentId],
        references: [departments.id]
    }),
}));


export const departments= pgTable ("departments",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:100}),
    parentId:integer("parent_id").references(()=>departments.id)
});



export const departmentRelations=relations(departments,({many})=>({
    user: many(users)
}));

export const profiles=pgTable("profiles",{
    id:serial("id").primaryKey(),
    bio:varchar("bio",{length:256}),
    userId:integer("user_id").notNull().references(()=>users.id)
});

