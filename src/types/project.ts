export interface ProjectTag {
  name: string;
  is_super_tag: boolean;
  id: string;
  date_created: string;
  is_following: boolean;
}

export interface Project {
  is_public: boolean;
  id: string;
  members_count: number;
  alias: string;
  owner_id: string;
  organisation: string;
  apps_count: number;
  description: string;
  prometheus_url: string;
  is_following: boolean;
  followers_count: number;
  disabled: boolean;
  age: string;
  supports_ml: string | null;
  admin_disabled: boolean;
  date_created: string;
  tags: ProjectTag[];
  name: string;
  project_type: string;
  cluster_id: string;
  is_pinned: boolean;
}
