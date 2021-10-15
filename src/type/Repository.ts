export interface Repository {
    id: number;
    name: string;
    full_name: string;
    created_at: string;
    updated_at: string;
    description: string;
    language: string;
    license: {
      name: string;
    };
    owner: {
      login: string;
      avatar_url: string;
    };
    stargazers_count: number;
  watchers_count: number;
  topics: string[]
  }

export type Repositories = Repository[];