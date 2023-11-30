-- Creating tables

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

CREATE TABLE `campus_entity` (
    `id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `school_id` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

CREATE TABLE `shared_calendar_entity` (
    `id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `hash` VARCHAR(255) NOT NULL,
    `class_scheduler_id` VARCHAR(255) NOT NULL,
    `enabled` TINYINT(1) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

CREATE TABLE `subject_entity` (
    `id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `class_year_id` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

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

-- Adding indexes

ALTER TABLE `class_year_entity`
ADD INDEX `class_year_entity_school_id_index` (`school_id`);

ALTER TABLE `campus_entity`
ADD INDEX `campus_entity_school_id_index` (`school_id`);

ALTER TABLE `subject_entity`
ADD INDEX `subject_entity_class_year_id_index` (`class_year_id`);

ALTER TABLE `subject_event_entity`
ADD INDEX `subject_event_entity_class_scheduler_id_index` (`class_scheduler_id`);

-- Adding foreign key constraints

ALTER TABLE `class_year_entity`
ADD CONSTRAINT `class_year_entity_school_id_foreign`
FOREIGN KEY (`school_id`) REFERENCES `school_entity` (`id`) ON UPDATE CASCADE;

ALTER TABLE `campus_entity`
ADD CONSTRAINT `campus_entity_school_id_foreign`
FOREIGN KEY (`school_id`) REFERENCES `school_entity` (`id`) ON UPDATE CASCADE;

ALTER TABLE `subject_entity`
ADD CONSTRAINT `subject_entity_class_year_id_foreign`
FOREIGN KEY (`class_year_id`) REFERENCES `class_year_entity` (`id`) ON UPDATE CASCADE;

ALTER TABLE `subject_event_entity`
ADD CONSTRAINT `subject_event_entity_class_scheduler_id_foreign`
FOREIGN KEY (`class_scheduler_id`) REFERENCES `class_scheduler_entity` (`id`) ON UPDATE CASCADE;
