ALTER TABLE `account` MODIFY COLUMN `created_at` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` MODIFY COLUMN `created_at` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `created_at` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `updated_at` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `verification` MODIFY COLUMN `created_at` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `verification` MODIFY COLUMN `updated_at` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;