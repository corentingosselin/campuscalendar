-- Create school_entity table
CREATE TABLE `school_entity` (
    `id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

-- Create class_year_entity table
CREATE TABLE `class_year_entity` (
    `id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `school_id` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;
ALTER TABLE `class_year_entity` ADD INDEX `class_year_entity_school_id_index`(`school_id`);

-- Create campus_entity table
CREATE TABLE `campus_entity` (
    `id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `school_id` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;
ALTER TABLE `campus_entity` ADD INDEX `campus_entity_school_id_index`(`school_id`);

-- Create subject_entity table
CREATE TABLE `subject_entity` (
    `id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `class_year_id` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;
ALTER TABLE `subject_entity` ADD INDEX `subject_entity_class_year_id_index`(`class_year_id`);

-- Add foreign key constraints
ALTER TABLE `class_year_entity` ADD CONSTRAINT `class_year_entity_school_id_foreign` FOREIGN KEY (`school_id`) REFERENCES `school_entity` (`id`) ON UPDATE CASCADE;
ALTER TABLE `campus_entity` ADD CONSTRAINT `campus_entity_school_id_foreign` FOREIGN KEY (`school_id`) REFERENCES `school_entity` (`id`) ON UPDATE CASCADE;
ALTER TABLE `subject_entity` ADD CONSTRAINT `subject_entity_class_year_id_foreign` FOREIGN KEY (`class_year_id`) REFERENCES `class_year_entity` (`id`) ON UPDATE CASCADE;
