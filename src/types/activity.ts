export interface UserActivity {
  _id: { $oid: string };
  user_id: string;
  user_email: string;
  user_name: string;
  creation_date: string;
  operation: string;
  model: string;
  status: string;
  description?: string;
  a_user_id?: string | null;
  a_db_id?: string | null;
  a_app_id?: string | null;
  a_project_id?: string | null;
}
