import { LegalRepresentative } from './legal-representative';
import { User } from './user';

export interface Appointment {
    lawyer: LegalRepresentative;
    client: User | null;
    remote: boolean;
    location?: string;
    price: number;
}