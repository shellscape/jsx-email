import { Body, Container, Head, Html } from '@jsx-email/all';
import { Code } from '@jsx-email/code';
import { Tailwind } from '@jsx-email/tailwind';

export const CodeEmail = () => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans">
        <Container className="border-separate border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
          <Code language="js">
            {`
    import { batman } from 'superheros';
    import { joker } from 'villains';

    const henchmen = joker.help();

    batman.fight(henchmen);
    batman.arrest(joker);
    `}
          </Code>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

// eslint-disable-next-line
export default CodeEmail;
