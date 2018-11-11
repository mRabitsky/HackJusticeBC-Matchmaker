export interface User {
    id: number;
    password: string;
    name: string;
    email: string;
    userType: UserType;
    ratings: StarRating;
}

export interface StarRating {
    stars: [number, number, number, number, number],
    average: number
}
export enum UserType {
    Lawyer,
    Client,
}