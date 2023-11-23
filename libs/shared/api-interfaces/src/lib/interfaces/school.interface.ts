import { Entity } from "./entity.interface";

export interface Campus extends Entity {
    name: string;   
}

export interface ClassYear extends Entity {
    name: string;
    subjects: Subject[];
}

export interface Subject extends Entity {
    name: string;
}

export interface School extends Entity {
    name: string;
    campuses: Campus[];
    classYears: ClassYear[];
}