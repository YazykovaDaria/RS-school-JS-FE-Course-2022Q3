interface NewsSourse {
    id: string | null;
    name: string;
}

interface News {
    author: null;
    content: string;
    description: string;
    publishedAt: string;
    source: NewsSourse;
    title: string;
    url: string;
    urlToImage: string;
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Array<News>;
}
