import { Body, Code, Container, Head, Html, Tailwind } from 'jsx-email';

export const Template = () => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="mx-auto my-auto bg-white font-sans">
        <Container className="mx-auto my-[40px] w-[465px] border-separate rounded border border-solid border-[#eaeaea] p-[20px]">
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
