import {
  Avatar,
  AvatarGroup,
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from 'jsx-email';

interface VercelInviteUserEmailProps {
  username?: string;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  inviteLink?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
}

const baseUrl = import.meta.isJsxEmailPreview ? '/static/' : 'https://jsx.email/assets/samples/';

export const previewProps = {
  username: 'batman',
  userImage: `${baseUrl}vercel-user.png`,
  invitedByUsername: 'joker',
  invitedByEmail: 'joker@arkham.com',
  teamName: 'Batmobile',
  teamImage: `${baseUrl}vercel-team.png`,
  inviteLink: 'https://vercel.com/teams/invite/foo',
  inviteFromIp: '123.45.678.910',
  inviteFromLocation: 'Gotham City'
} as VercelInviteUserEmailProps;

export const templateName = 'Vercel Invite User';

export const Template = ({
  username,
  userImage,
  invitedByUsername,
  invitedByEmail,
  teamName,
  teamImage,
  inviteLink,
  inviteFromIp,
  inviteFromLocation
}: VercelInviteUserEmailProps) => {
  const previewText = `Join ${invitedByUsername} on Vercel`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] border-separate rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}vercel-logo.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join <strong>{teamName}</strong> on <strong>Vercel</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hello {username},</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{invitedByUsername}</strong> (
              <Link href={`mailto:${invitedByEmail}`} className="text-blue-600 no-underline">
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{teamName}</strong> team on <strong>Vercel</strong>.
            </Text>
            <Section className="text-center">
              <AvatarGroup overlap={true} spacing={12} style={{ margin: '0 auto' }}>
                <Avatar src={userImage} name={username} width="64" height="64" />
                <Avatar src={teamImage} name={teamName} width="64" height="64" />
              </AvatarGroup>
            </Section>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                backgroundColor="#000000"
                width={120}
                height={38}
                borderRadius={4}
                textColor="#fff"
                align="center"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="!text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{' '}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="!text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for <span className="text-black">{username} </span>.This
              invite was sent from <span className="text-black">{inviteFromIp}</span> located in{' '}
              <span className="text-black">{inviteFromLocation}</span>. If you were not expecting
              this invitation, you can ignore this email. If you are concerned about your account's
              safety, please reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
