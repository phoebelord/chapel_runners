export enum AspectType {
  CREATE = 'create',
  DELETE = 'delete',
  UPDATE = 'update',
}
export type ObjectType = 'activity' | 'athlete';

export interface WebhookEvent {
  object_type: ObjectType;
  object_id: number;
  aspect_type: AspectType;
  updates: {
    title?: string;
    type?: string;
    private?: boolean;
    authorized?: boolean;
  };
  owner_id: number;
  subscription_id: number;
  event_time: number;
}

export interface UserSummary {
  userId: number;
  username: string;
  firstname: string;
  lastname: string;
  sex: string;
}

export interface User extends UserSummary {
  PK: string;
  SK: string;
  itemType: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface StravaActivity {
  resource_state: 3;
  athlete: {
    id: number;
    resource_state: 1;
  };
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  private: boolean;
  visibility: string;
  average_speed: number;
  description: string;
  calories: number;
  [key: string]: any;
}

export interface StravaAccessTokenRequest {
  client_id: string;
  client_secret: string;
  code: string;
  grant_type: string;
}
export interface StravaRefreshTokenRequest {
  client_id: string;
  client_secret: string;
  refresh_token: string;
  grant_type: string;
}

export interface StravaRefreshTokenResponse {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
}

export interface StravaNewTokenResponse extends StravaRefreshTokenResponse {
  athlete: StravaAthleteSummary;
}

export interface StravaAthleteSummary {
  id: number;
  username: string;
  resource_state: 2;
  firstname: string;
  lastname: string;
  sex: string;
  [key: string]: any;
}

export interface Errors {
  code: number;
  message: ErrorMessages;
}
export type ErrorMessages =
  | 'NOT_FOUND'
  | 'DB_ERROR'
  | 'CHECK_FAILED'
  | 'ACCESS_TOKEN_GENERATION_FAILED'
  | 'REFRESH_TOKEN_GENERATION_FAILED'
  | 'COULD_NOT_READ_STRAVA_ACTIVITY';

export interface Activity {
  PK: string;
  SK: string;
  itemType: string;
  distance: number;
  elevationGain: number;
  startDate: string;
  description: string;
  movingTime: number;
  elapsedTime: number;
  tags: string[];
  points: Points;
}

export interface Challenge {
  PK: string;
  SK: string;
  itemType: string;
  trackers: {
    distance?: {
      [key: number]: number;
    };
    elevation?: {
      [key: number]: number;
    };
  };
  tags: {
    [key: string]: number | null;
  };
}

export interface ChallengeScore {
  PK: string; // Challenge ID
  SK: string; // User ID
  itemType: string;
  'GSI1-PK'?: string; // Challenge ID
  'GSI1-SK'?: string; // Group ID
  points: Points;
  totals: Totals;
  user: UserSummary;
  groupName?: string;
}

export interface Points {
  distance: number;
  elevation: number;
  tags: number;
}

export interface Totals {
  distance: number;
  elevation: number;
  runs: number;
}

export interface UserChallengeDetails {
  PK: string; // User ID
  SK: string; // Challenge ID
  itemType: string;
  'GSI1-PK'?: string; // Group ID
  'GSI1-SK'?: string; // User ID
  groupName?: string;
}

export interface Group {
  PK: string; // Challenge ID
  SK: string; // Group ID
  itemType: string;
  name: string;
}

export interface Tag {
  PK: string;
  SK: string;
  Type: string;
  points?: number;
}
