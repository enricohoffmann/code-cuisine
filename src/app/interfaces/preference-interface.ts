
export interface Characteristic {
    id: number;
    characteristic: string;
    description: string | null;
    selected: boolean;
}


export interface Preference {
    headline: string;
    headlineIconUrl: string;
    characteristics: Characteristic[];
}