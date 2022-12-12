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

export type SourseResponse = {
    status?: string;
    sourses?: Array<SourseItem>;
};

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Array<NewsType>;
}

export interface Options {
    [key: string]: string;
   // [sources: string]: string;
    // sources: string;
    // apiKey: string;
}

// export type GetResponse = {
//     endpoint: string;
//     options: Options;
// };

export type Callback<T> = (data?: T) => void;

// export interface NewsLoader {
//     baseLink: string;
//     options?: Options;
// }
