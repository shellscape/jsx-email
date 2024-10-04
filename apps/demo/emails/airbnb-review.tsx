import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text
} from 'jsx-email';

interface AirbnbReviewEmailProps {
  authorName?: string;
  authorImage?: string;
  reviewText?: string;
}

const baseUrl = 'https://jsx.email/assets/demo/';

export const previewProps = {
  authorName: 'Joker',
  authorImage: `${baseUrl}batman-twilight.jpg`,
  reviewText: `"Batsy's stay at my Airbnb Batcave was a riot! Batman surprised with a hidden sense of humor, engaging in epic banter and a prank war. His detective skills impressed, and the Batcave remained spotless. Game night and snacks were a hit, and even during downtime, he couldn't resist a Bat-signal. Hosting Batsy was chaos perfected – if you want a guest with brooding intensity and unexpected laughter, Batman's your Bat. Hahahahahahahahahaha! "`
} as AirbnbReviewEmailProps;

export const templateName = 'Airbnb Review';

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px'
};

const userImage = {
  margin: '0 auto',
  marginBottom: '16px',
  borderRadius: '50%'
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848'
};

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848'
};

const review = {
  ...paragraph,
  padding: '24px',
  backgroundColor: '#f2f3f3',
  borderRadius: '4px'
};

const link = {
  ...paragraph,
  color: '#ff5a5f',
  display: 'block'
};

const reportLink = {
  fontSize: '14px',
  color: '#9ca299',
  textDecoration: 'underline'
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0'
};

const footer = {
  color: '#9ca299',
  fontSize: '14px',
  marginBottom: '10px'
};

export const Template = ({ authorName, authorImage, reviewText }: AirbnbReviewEmailProps) => {
  const previewText = `Read ${authorName}'s review`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Section style={main}>
          <Container style={container}>
            <Section>
              <Img src={`${baseUrl}airbnb-logo.png`} width="96" height="30" alt="Airbnb" />
            </Section>
            <Section>
              <Img src={authorImage} width="96" height="96" alt={authorName} style={userImage} />
            </Section>
            <Section style={{ paddingBottom: '20px' }}>
              <Row>
                <Text style={heading}>Here's what {authorName} wrote</Text>
                <Text style={review}>{reviewText}</Text>
                <Text style={paragraph}>
                  Now that the review period is over, we’ve posted {authorName}
                  ’s review to your Airbnb profile.
                </Text>
                <Text style={{ ...paragraph, paddingBottom: '16px' }}>
                  While it’s too late to write a review of your own, you can send your feedback to{' '}
                  {authorName} using your Airbnb message thread.
                </Text>
                <Button
                  width={300}
                  height={60}
                  align="center"
                  backgroundColor={'#ff5a5f'}
                  borderRadius={3}
                  textColor="#fff"
                  fontSize={18}
                  href="https://airbnb.com/"
                >
                  Send My Feedback
                </Button>
              </Row>
            </Section>

            <Hr style={hr} />

            <Section>
              <Row>
                <Text style={{ ...paragraph, fontWeight: '700' }}>Common questions</Text>
                <Text>
                  <Link href="https://airbnb.com/help/article/13" style={link}>
                    How do reviews work?
                  </Link>
                </Text>
                <Text>
                  <Link href="https://airbnb.com/help/article/1257" style={link}>
                    How do star ratings work?
                  </Link>
                </Text>
                <Text>
                  <Link href="https://airbnb.com/help/article/995" style={link}>
                    Can I leave a review after 14 days?
                  </Link>
                </Text>
                <Hr style={hr} />
                <Text style={footer}>Airbnb, Inc., 888 Brannan St, San Francisco, CA 94103</Text>
                <Link href="https://airbnb.com" style={reportLink}>
                  Report unsafe behavior
                </Link>
              </Row>
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  );
};
