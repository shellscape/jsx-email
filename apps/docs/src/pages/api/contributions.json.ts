/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
/* eslint-disable sort-keys */
/* eslint-disable import/no-unresolved */
import type { APIRoute } from 'astro';
import { Octokit } from '@octokit/rest';

export const GET: APIRoute = async () => {
  const octokit = new Octokit();

  try {
    const { data: pulls } = await octokit.rest.pulls.list({
      owner: 'shellscape',
      repo: 'jsx-email',
      state: 'closed',
      per_page: 100,
      sort: 'updated',
      direction: 'desc'
    });

    const contributions = pulls.map((pull) => ({
      date: pull.closed_at,
      author: pull.user?.login,
      avatar: pull.user?.avatar_url,
      description: pull.title,
      number: pull.number,
      url: pull.html_url
    }));

    return new Response(JSON.stringify(contributions), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch contributions' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
