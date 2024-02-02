/* eslint-disable */
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
      <Body className="mx-auto my-auto bg-white font-sans dark:bg-black">
        <Container className="mx-auto my-[40px] w-[465px] border-separate rounded border border-solid border-[#eaeaea] p-[20px]">
          <Section className="mt-[32px]">
            <Img
              src={`vercel-logo.png`}
              width="40"
              height="37"
              alt="Vercel"
              className="mx-auto my-0"
            />
          </Section>
          <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
            Join <strong></strong> on <strong>Vercel</strong>
          </Heading>
          <Text className="text-[14px] leading-[24px] text-black">Hello,</Text>
          <Text className="text-[14px] leading-[24px] text-black">
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
          <Section className="mb-[32px] mt-[32px] text-center">
            <Button
              className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
              href=""
            >
              Join the team
            </Button>
          </Section>
          <Text className="!text-[14px] leading-[24px] text-black">
            or copy and paste this URL into your browser:{' '}
            <Link href="" className="text-blue-600 no-underline"></Link>
          </Text>
          <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
          <Text className="!text-[12px] leading-[24px] text-[#666666]">
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
