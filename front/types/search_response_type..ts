import { ObjectType } from "./search_object_type";

interface ResponseType {
    keyword: string;
    result_count: number;
    data: ObjectType[];
}

export type { ResponseType };