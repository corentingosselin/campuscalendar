import { Entity } from "./entity.interface";

export interface School extends Entity {
    name: string;
    classYear: ClassYear[];
}

export interface ClassYear extends Entity {
    name: string;
    subjects: string[];
}

export interface Class extends Entity {
    name: string;
}

export interface Campus extends Entity {
    name: string;
}

export interface Year extends Entity {
    name: string;
}