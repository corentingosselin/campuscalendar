CREATE TABLE `school_entity` (
  `id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

CREATE TABLE `class_year_entity` (
  `id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `school_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;
CREATE INDEX `class_year_entity_school_id_index` ON `class_year_entity` (`school_id`);

CREATE TABLE `campus_entity` (
  `id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `school_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;
CREATE INDEX `campus_entity_school_id_index` ON `campus_entity` (`school_id`);

CREATE TABLE `class_scheduler_entity` (
  `id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  `campus_id` VARCHAR(255) NOT NULL,
  `available_dates` TEXT NOT NULL,
  `year` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;
CREATE INDEX `class_scheduler_entity_campus_id_index` ON `class_scheduler_entity` (`campus_id`);

CREATE TABLE `subject_entity` (
  `id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `class_year_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;
CREATE INDEX `subject_entity_class_year_id_index` ON `subject_entity` (`class_year_id`);

CREATE TABLE `subject_event_entity` (
  `id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `start_time` VARCHAR(255) NOT NULL,
  `end_time` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `class_scheduler_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;
CREATE INDEX `subject_event_entity_class_scheduler_id_index` ON `subject_event_entity` (`class_scheduler_id`);

CREATE TABLE `subject_event_entity_subject` (
  `subject_event_entity_id` VARCHAR(255) NOT NULL,
  `subject_entity_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`subject_event_entity_id`, `subject_entity_id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;
CREATE INDEX `subject_event_entity_subject_subject_event_entity_id_index` ON `subject_event_entity_subject` (`subject_event_entity_id`);
CREATE INDEX `subject_event_entity_subject_subject_entity_id_index` ON `subject_event_entity_subject` (`subject_entity_id`);

ALTER TABLE `class_year_entity` ADD CONSTRAINT `class_year_entity_school_id_foreign` FOREIGN KEY (`school_id`) REFERENCES `school_entity` (`id`) ON UPDATE CASCADE;

ALTER TABLE `campus_entity` ADD CONSTRAINT `campus_entity_school_id_foreign` FOREIGN KEY (`school_id`) REFERENCES `school_entity` (`id`) ON UPDATE CASCADE;

ALTER TABLE `class_scheduler_entity` ADD CONSTRAINT `class_scheduler_entity_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campus_entity` (`id`) ON UPDATE CASCADE;

ALTER TABLE `subject_entity` ADD CONSTRAINT `subject_entity_class_year_id_foreign` FOREIGN KEY (`class_year_id`) REFERENCES `class_year_entity` (`id`) ON UPDATE CASCADE;

ALTER TABLE `subject_event_entity` ADD CONSTRAINT `subject_event_entity_class_scheduler_id_foreign` FOREIGN KEY (`class_scheduler_id`) REFERENCES `class_scheduler_entity` (`id`) ON UPDATE CASCADE;

ALTER TABLE `subject_event_entity_subject` ADD CONSTRAINT `subject_event_entity_subject_subject_event_entity_id_foreign` FOREIGN KEY (`subject_event_entity_id`) REFERENCES `subject_event_entity` (`id`) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE `subject_event_entity_subject` ADD CONSTRAINT `subject_event_entity_subject_subject_entity_id_foreign` FOREIGN KEY (`subject_entity_id`) REFERENCES `subject_entity` (`id`) ON UPDATE CASCADE ON DELETE CASCADE;
