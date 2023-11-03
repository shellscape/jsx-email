import { getCode } from '@jsx-email/code';

// @ts-ignore
const Code = await getCode({ language: 'js' });

export const CodeEmail = () => {
  return (
    <Code>
      {`
    import { batman } from 'superheros';
    import { joker } from 'villains';

    const henchmen = joker.help();

    batman.fight(henchmen);
    batman.arrest(joker);
    `}
    </Code>
  );
};

export default CodeEmail;
