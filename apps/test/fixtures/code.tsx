import { Body, Code, Container, Head, Html, Tailwind } from 'jsx-email';

export const CodeEmail = () => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans">
        <Container
          containerWidth={465}
          className="border-separate border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px]"
        >
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
