
export interface Characteristic {
    characteristic: string;
    description: string | null;
}


export interface Preference {
    headline: string;
    headlineIconUrl: string;
    characteristics: Characteristic[];
}