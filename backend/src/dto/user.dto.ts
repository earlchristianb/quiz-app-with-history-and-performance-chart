
export interface userScoreObjectDTO{
   average?: number,
    scoreHistory:number[]
}

export interface userCategoriesDTO {
    computers: userScoreObjectDTO,
    sports: userScoreObjectDTO,
    geography: userScoreObjectDTO,
    history: userScoreObjectDTO,
    politics:userScoreObjectDTO,
}
export type UserDTO ={
    email: string,
    userName: string,
    hashedPassword: string,
    image?: string,
    _id:string
    scores: userCategoriesDTO[],
    createdAt: Date,
    updatedAt:Date,
}