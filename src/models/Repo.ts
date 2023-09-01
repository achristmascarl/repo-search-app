export interface RawRepo {
  owner: { avatar_url: string };
  full_name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
  languages_url: string;
  forks: number;
  watchers: number;
}

export interface ProcessedRepo {
  index: number;
  avatarUrl: string;
  name: string;
  description: string;
  link: string;
  languagesUrl: string;
  watchers: number;
  forks: number;
  stars: number;
}
