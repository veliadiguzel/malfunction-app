import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";


export const users=pgTable("users",{
    id:serial("id").primaryKey(),
    userName:text("user_name"),
    fullName:text("full_name"),
});

export const userRelations=relations(users,({one}) => ({
    profile : one(profiles,{
        fields:[users.id],
        references:[profiles.userId]
    }),
}));

export const profiles=pgTable("profiles",{
    id:serial("id").primaryKey(),
    bio:varchar("bio",{length:256}),
    userId:integer("user_id").notNull().references(()=>users.id)
});