import { Column, Img, Row, Text, render } from 'jsx-email';
import React from 'react';
import { codeToHtml } from 'shiki';

export interface Block {
  name: string;
  code: string;
  codeHtml: string;
  renderedHtml: string;
}

// Pattern 1: Basic Circular Avatar
const BasicCircularAvatar = () => (
  <Img
    src="https://i.pravatar.cc/96?u=john"
    alt="John Doe"
    width={48}
    height={48}
    style={{
      borderRadius: '50%',
      display: 'inline-block',
      verticalAlign: 'middle'
    }}
  />
);

const basicCircularAvatarCode = `import { Img } from 'jsx-email';

<Img
  src="https://example.com/avatar.jpg"
  alt="John Doe"
  width={48}
  height={48}
  style={{
    borderRadius: '50%',
    display: 'inline-block',
    verticalAlign: 'middle'
  }}
/>`;

// Pattern 2: Rounded Avatar
const RoundedAvatar = () => (
  <Img
    src="https://i.pravatar.cc/96?u=sarah"
    alt="Sarah Smith"
    width={48}
    height={48}
    style={{
      borderRadius: 8,
      display: 'inline-block',
      verticalAlign: 'middle'
    }}
  />
);

const roundedAvatarCode = `import { Img } from 'jsx-email';

<Img
  src="https://example.com/avatar.jpg"
  alt="Sarah Smith"
  width={48}
  height={48}
  style={{
    borderRadius: 8,
    display: 'inline-block',
    verticalAlign: 'middle'
  }}
/>`;

// Pattern 3: Avatar with Name
const AvatarWithName = () => (
  <Row>
    <Column style={{ width: 48, verticalAlign: 'middle' }}>
      <Img
        src="https://i.pravatar.cc/96?u=jane"
        alt="Jane Doe"
        width={48}
        height={48}
        style={{ borderRadius: '50%' }}
      />
    </Column>
    <Column style={{ paddingLeft: 12, verticalAlign: 'middle' }}>
      <Text style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Jane Doe</Text>
    </Column>
  </Row>
);

const avatarWithNameCode = `import { Row, Column, Img, Text } from 'jsx-email';

<Row>
  <Column style={{ width: 48, verticalAlign: 'middle' }}>
    <Img
      src="https://example.com/avatar.jpg"
      alt="Jane Doe"
      width={48}
      height={48}
      style={{ borderRadius: '50%' }}
    />
  </Column>
  <Column style={{ paddingLeft: 12, verticalAlign: 'middle' }}>
    <Text style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>
      Jane Doe
    </Text>
  </Column>
</Row>`;

// Pattern 4: Avatar with Name and Description
const AvatarWithDescription = () => (
  <Row>
    <Column style={{ width: 48, verticalAlign: 'middle' }}>
      <Img
        src="https://i.pravatar.cc/96?u=mike"
        alt="Mike Johnson"
        width={48}
        height={48}
        style={{ borderRadius: '50%' }}
      />
    </Column>
    <Column style={{ paddingLeft: 12, verticalAlign: 'middle' }}>
      <Text style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#111827' }}>
        Mike Johnson
      </Text>
      <Text style={{ margin: 0, fontSize: 12, color: '#6b7280' }}>Software Engineer</Text>
    </Column>
  </Row>
);

const avatarWithDescriptionCode = `import { Row, Column, Img, Text } from 'jsx-email';

<Row>
  <Column style={{ width: 48, verticalAlign: 'middle' }}>
    <Img
      src="https://example.com/avatar.jpg"
      alt="Mike Johnson"
      width={48}
      height={48}
      style={{ borderRadius: '50%' }}
    />
  </Column>
  <Column style={{ paddingLeft: 12, verticalAlign: 'middle' }}>
    <Text style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#111827' }}>
      Mike Johnson
    </Text>
    <Text style={{ margin: 0, fontSize: 12, color: '#6b7280' }}>
      Software Engineer
    </Text>
  </Column>
</Row>`;

// Helper to render a component to HTML
async function renderBlock(Component: React.FC): Promise<string> {
  return await render(<Component />);
}

// Helper to highlight code with Shiki
async function highlightCode(code: string): Promise<string> {
  return await codeToHtml(code, {
    lang: 'tsx',
    theme: 'github-dark'
  });
}

// Export function to get all rendered blocks
export async function getRenderedBlocks(): Promise<Block[]> {
  return [
    {
      name: 'Basic Circular Avatar',
      code: basicCircularAvatarCode,
      codeHtml: await highlightCode(basicCircularAvatarCode),
      renderedHtml: await renderBlock(BasicCircularAvatar)
    },
    {
      name: 'Rounded Avatar',
      code: roundedAvatarCode,
      codeHtml: await highlightCode(roundedAvatarCode),
      renderedHtml: await renderBlock(RoundedAvatar)
    },
    {
      name: 'Avatar with Name',
      code: avatarWithNameCode,
      codeHtml: await highlightCode(avatarWithNameCode),
      renderedHtml: await renderBlock(AvatarWithName)
    },
    {
      name: 'Avatar with Name and Description',
      code: avatarWithDescriptionCode,
      codeHtml: await highlightCode(avatarWithDescriptionCode),
      renderedHtml: await renderBlock(AvatarWithDescription)
    }
  ];
}
