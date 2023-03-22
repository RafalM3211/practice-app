export interface PostData {
    email: string,
    zipCode: string,
    title: string,
    content: string,
}

export interface Post extends PostData {
    id: number
}

export interface UserLoginData {
    login: string,
    password: string,
}