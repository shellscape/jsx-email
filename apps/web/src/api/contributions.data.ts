// eslint-disable-next-line import/no-extraneous-dependencies
import { Octokit } from '@octokit/rest';

// eslint-disable-next-line import/no-default-export
export default {
  async load() {
    const octokit = new Octokit();

    const { data: releases } = await octokit.rest.pulls.list({
      owner: 'shellscape',
      per_page: 100,
      repo: 'jsx-email',
      state: 'closed'
    });

    return releases;
  }
};
