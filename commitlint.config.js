module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'dx',
        'style',
        'refactor',
        'perf',
        'test',
        'workflow',
        'build',
        'ci',
        'chore',
        'types',
        'wip',
        'release',
      ],
    ],
  },
};
