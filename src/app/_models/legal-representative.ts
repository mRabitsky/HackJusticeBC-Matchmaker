import { User } from './user';

export interface LegalRepresentative extends User {
    avatar: string; // URL for the profile avatar image
    blurb: string; // 200 chars that describe this legal representative, shown on the profile and in the appointments.
    practice: LegalPractice;
}
export interface LegalPractice {
    specialization: Specialization;
    jurisdiction: Jurisdiction[];
    expertise: AreaOfLaw[];
}

export const enum AreaOfLaw {
    ADMIRALTY = 'Admiralty (Maritime)',
    BANKRUPTCY = 'Bankruptcy',
    CORPORATE = 'Business (Corporate)',
    CIVIL_RIGHTS = 'Civil Rights',
    CRIMINAL = 'Criminal',
    ENTERTAINMENT = 'Entertainment',
    ENVIRONMENTAL = 'Environmental',
    FAMILY = 'Family',
    HEALTH = 'Health',
    IMMIGRATION = 'Immigration',
    IP = 'Intellectual Property',
    INTL = 'International',
    LABOUR = 'Labor (Employment)',
    MILITARY = 'Military',
    PERSONAL_INJURY = 'Personal Injury',
    REAL_ESTATE = 'Real Estate',
    TAX = 'Tax',
    OTHER = 'Other / Not Sure'
}
export type Jurisdiction =
    // Canada
    'ca_AB' | 'ca_BC' | 'ca_MB' | 'ca_NB' | 'ca_NL' | 'ca_NS' | 'ca_ON' | 'ca_PE' | 'ca_QC' | 'ca_SK' | 'ca_NT' | 'ca_NU' | 'ca_YT' |
    // USA
    'us_AK' | 'us_AL' | 'us_AR' | 'us_AZ' | 'us_CA' | 'us_CO' | 'us_CT' | 'us_DC' | 'us_DE' | 'us_FL' | 'us_GA' | 'us_HI' | 'us_IA' |
    'us_ID' | 'us_IL' | 'us_IN' | 'us_KS' | 'us_KY' | 'us_LA' | 'us_MA' | 'us_MD' | 'us_ME' | 'us_MI' | 'us_MN' | 'us_MO' | 'us_MS' |
    'us_MT' | 'us_NC' | 'us_ND' | 'us_NE' | 'us_NH' | 'us_NJ' | 'us_NM' | 'us_NV' | 'us_NY' | 'us_OH' | 'us_OK' | 'us_OR' | 'us_PA' |
    'us_RI' | 'us_SC' | 'us_SD' | 'us_TN' | 'us_TX' | 'us_UT' | 'us_VA' | 'us_VT' | 'us_WA' | 'us_WI' | 'us_WV' | 'us_WY' |
    // US Territories & Armed Forces Deployments
    'ust_AA' | 'ust_AE' | 'ust_AP' | 'ust_AS' | 'ust_DC' | 'ust_FM' | 'ust_GU' | 'ust_MH' | 'ust_MP' | 'ust_PW' | 'ust_PR' | 'ust_VI';

export type Specialization = 'lawyer' | 'paralegal' | 'solicitor';