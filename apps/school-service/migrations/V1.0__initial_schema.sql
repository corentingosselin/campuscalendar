CREATE TABLE `campus_entity` (
    `id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

CREATE TABLE `class_entity` (
    `id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `campus_id` VARCHAR(255) NOT NULL,
    `student_ids` TEXT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `class_entity_campus_id_index`(`campus_id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

CREATE TABLE `course_type_entity` (
    `id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `duration` INT NOT NULL,
    `priority` INT NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

CREATE TABLE `course_entity` (
    `id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `course_type_id` VARCHAR(255) NOT NULL,
    `teacher_id` INT NOT NULL,
    `class_id` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `course_entity_course_type_id_index`(`course_type_id`),
    INDEX `course_entity_class_id_index`(`class_id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

CREATE TABLE `course_schedule_slot_entity` (
    `id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `course_id` VARCHAR(255) NOT NULL,
    `start_date_time` DATETIME NOT NULL,
    `end_date_time` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `course_schedule_slot_entity_course_id_index`(`course_id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE = InnoDB;

ALTER TABLE `class_entity` 
ADD CONSTRAINT `class_entity_campus_id_foreign` 
FOREIGN KEY (`campus_id`) REFERENCES `campus_entity` (`id`) 
ON UPDATE CASCADE;

ALTER TABLE `course_entity` 
ADD CONSTRAINT `course_entity_course_type_id_foreign` 
FOREIGN KEY (`course_type_id`) REFERENCES `course_type_entity` (`id`) 
ON UPDATE CASCADE;

ALTER TABLE `course_entity` 
ADD CONSTRAINT `course_entity_class_id_foreign` 
FOREIGN KEY (`class_id`) REFERENCES `class_entity` (`id`) 
ON UPDATE CASCADE;

ALTER TABLE `course_schedule_slot_entity` 
ADD CONSTRAINT `course_schedule_slot_entity_course_id_foreign` 
FOREIGN KEY (`course_id`) REFERENCES `course_entity` (`id`) 
ON UPDATE CASCADE;
