ALTER TABLE "users" ALTER COLUMN "department_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "department_id" SET NOT NULL;