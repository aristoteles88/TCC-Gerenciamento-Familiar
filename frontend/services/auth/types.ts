export interface Auth {
    uid: string;
    email: string | null;
}

export interface User {
    uid: string;
    name: string;
    email: string | null;
    date_of_birth: string | null;
    family_id: string | null;
    points: number;
    isAdmin: boolean;
    role: string | null;
    avatar: string | null;
}

export interface Family {
    uid: string | null;
    name: string;
    members: Array<string>;
}

export interface AuthContextType {
    userAuth: Auth | null;
    loading: boolean;
    login: (type: string, email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}