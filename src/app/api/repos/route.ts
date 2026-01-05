import { NextResponse } from 'next/server';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'satyammistari';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface RepoStats {
  name: string;
  stars: number;
  forks: number;
  description: string;
  url: string;
  language: string;
  updatedAt: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const repos = searchParams.get('repos')?.split(',') || [];

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const repoStats: RepoStats[] = [];

    for (const repoName of repos) {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`,
        {
          headers,
          next: { revalidate: 3600 }, // Cache for 1 hour
        }
      );

      if (response.ok) {
        const data = await response.json();
        repoStats.push({
          name: data.name,
          stars: data.stargazers_count,
          forks: data.forks_count,
          description: data.description,
          url: data.html_url,
          language: data.language,
          updatedAt: data.updated_at,
        });
      }
    }

    return NextResponse.json({ repos: repoStats });
  } catch (error) {
    console.error('Error fetching repo stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repository stats' },
      { status: 500 }
    );
  }
}
