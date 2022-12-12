type NewsSourse = {
    id: string | null;
    name: string;
};

export type NewsType = {
    author: null;
    content: string;
    description: string;
    publishedAt: string;
    source: NewsSourse;
    title: string;
    url: string;
    urlToImage: string;
};

export type SourseItem = {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
};

export type SourcesResponse = {
    status?: string;
    sources?: Array<SourseItem>;
};

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Array<NewsType>;
}

export interface Options {
    [key: string]: string;
}

export type Callback<T> = (data?: T) => void;
