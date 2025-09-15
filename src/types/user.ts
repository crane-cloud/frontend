export interface UserRole {
  id: string;
  name: string;
}

export interface User {
  last_seen: string;
  is_public: boolean;
  id: string;
  biography: string;
  roles: UserRole[];
  credits: any[];
  organisation: string;
  is_beta_user: boolean;
  disabled: boolean;
  age: string;
  verified: boolean;
  username: string;
  admin_disabled: boolean;
  date_created: string;
  social_links: Record<string, string>;
  name: string;
  profile_picture: string;
  email: string;
}
