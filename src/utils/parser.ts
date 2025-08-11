import { parseStringPromise } from 'xml2js';
import axios from 'axios';

export interface Project {
    title: string;
    link: string;
    pubDate: string;
    category: string;
    description: string;
}

export async function fetchProjects(url: string): Promise<Project[]> {
    const { data } = await axios.get(url);
    const parsed = await parseStringPromise(data);

    return parsed.rss.channel[0].item.map((item: any) => ({
        title: item.title[0],
        link: item.link[0],
        pubDate: item.pubDate[0],
        category: item.category ? item.category[0] : '',
        description: item.description ? item.description[0] : '',
    }));
}
