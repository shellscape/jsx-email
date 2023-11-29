import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Section,
  Tailwind,
  Text
} from '../../../dist';

export const Template = () => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans">
        <Container className="border-separate border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
          <Section className="mt-[32px]">
            <Img
              src={`vercel-logo.png`}
              width="40"
              height="37"
              alt="Vercel"
              className="my-0 mx-auto"
            />
          </Section>
          <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            Join <strong></strong> on <strong>Vercel</strong>
          </Heading>
          <Text className="text-black text-[14px] leading-[24px]">Hello,</Text>
          <Text className="text-black text-[14px] leading-[24px]">
            <strong></strong> (<Link href={`mailto:`} className="text-blue-600 no-underline"></Link>
            ) has invited you to the <strong></strong> team on <strong>Vercel</strong>.
          </Text>
          <Section>
            <Row>
              <Column align="right">
                <Img className="rounded-full" src="" width="64" height="64" />
              </Column>
              <Column align="center">
                <Img src={`vercel-arrow.png`} width="12" height="9" alt="invited you to" />
              </Column>
              <Column align="left">
                <Img className="rounded-full" src="" width="64" height="64" />
              </Column>
            </Row>
          </Section>
          <Section className="text-center mt-[32px] mb-[32px]">
            <Button
              className="bg-[#000000] rounded text-white text-[12px] px-5 py-3 font-semibold no-underline text-center"
              href=""
            >
              Join the team
            </Button>
          </Section>
          <Text className="text-black !text-[14px] leading-[24px]">
            or copy and paste this URL into your browser:{' '}
            <Link href="" className="text-blue-600 no-underline"></Link>
          </Text>
          <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          <Text className="text-[#666666] !text-[12px] leading-[24px]">
            This invitation was intended for <span className="text-black"> </span>.This invite was
            sent from <span className="text-black"></span> located in{' '}
            <span className="text-black"></span>. If you were not expecting this invitation, you can
            ignore this email. If you are concerned about your account's safety, please reply to
            this email to get in touch with us.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
