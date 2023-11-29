-- Create table `class_scheduler_entity`
CREATE TABLE `class_scheduler_entity` (
  `id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  `campus_id` VARCHAR(255) NOT NULL,
  `school_id` VARCHAR(255) NOT NULL,
  `class_year_id` VARCHAR(255) NOT NULL,
  `available_dates` TEXT NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

-- Create table `school_entity`
CREATE TABLE `school_entity` (
  `id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

-- Create table `class_year_entity`
CREATE TABLE `class_year_entity` (
  `id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `school_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

ALTER TABLE
  `class_year_entity`
ADD
  INDEX `class_year_entity_school_id_index`(`school_id`);

-- Create table `campus_entity`
CREATE TABLE `campus_entity` (
  `id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `school_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

ALTER TABLE
  `campus_entity`
ADD
  INDEX `campus_entity_school_id_index`(`school_id`);

-- Create table `subject_entity`
CREATE TABLE `subject_entity` (
  `id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `class_year_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

ALTER TABLE
  `subject_entity`
ADD
  INDEX `subject_entity_class_year_id_index`(`class_year_id`);

-- Create table `subject_event_entity`
CREATE TABLE `subject_event_entity` (
  `id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `start_time` VARCHAR(255) NOT NULL,
  `end_time` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `subject_id` VARCHAR(255) NOT NULL,
  `class_scheduler_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

ALTER TABLE
  `subject_event_entity`
ADD
  INDEX `subject_event_entity_class_scheduler_id_index`(`class_scheduler_id`);

-- Add foreign key constraints
ALTER TABLE
  `class_year_entity`
ADD
  CONSTRAINT `class_year_entity_school_id_foreign` FOREIGN KEY (`school_id`) REFERENCES `school_entity` (`id`) ON UPDATE CASCADE;

ALTER TABLE
  `campus_entity`
ADD
  CONSTRAINT `campus_entity_school_id_foreign` FOREIGN KEY (`school_id`) REFERENCES `school_entity` (`id`) ON UPDATE CASCADE;

ALTER TABLE
  `subject_entity`
ADD
  CONSTRAINT `subject_entity_class_year_id_foreign` FOREIGN KEY (`class_year_id`) REFERENCES `class_year_entity` (`id`) ON UPDATE CASCADE;

ALTER TABLE
  `subject_event_entity`
ADD
  CONSTRAINT `subject_event_entity_class_scheduler_id_foreign` FOREIGN KEY (`class_scheduler_id`) REFERENCES `class_scheduler_entity` (`id`) ON UPDATE CASCADE;