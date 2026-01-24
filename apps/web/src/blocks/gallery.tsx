import { Column, Container, Img, Row, Section, Tailwind, render } from 'jsx-email';
import React from 'react';
import { codeToHtml } from 'shiki';

export interface Block {
  name: string;
  code: string;
  codeHtml: string;
  renderedHtml: string;
}

// Block 1: Single Image
const SingleImage = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Section className="px-4 py-4">
        <Img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
          alt="Mountain landscape"
          width={600}
          height={400}
          className="w-full rounded-lg"
        />
      </Section>
    </Container>
  </Tailwind>
);

const singleImageCode = `import { Container, Img, Section, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
    <Section className="px-4 py-4">
      <Img
        src="https://example.com/image.jpg"
        alt="Description"
        width={600}
        height={400}
        className="w-full rounded-lg"
      />
    </Section>
  </Container>
</Tailwind>`;

// Block 2: Two Column Images
const TwoColumnImages = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Row className="w-full">
        <Column className="w-1/2 pr-2">
          <Img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
            alt="Nature scene 1"
            width={300}
            height={200}
            className="w-full rounded-lg"
          />
        </Column>
        <Column className="w-1/2 pl-2">
          <Img
            src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=200&fit=crop"
            alt="Nature scene 2"
            width={300}
            height={200}
            className="w-full rounded-lg"
          />
        </Column>
      </Row>
    </Container>
  </Tailwind>
);

const twoColumnImagesCode = `import { Column, Container, Img, Row, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
    <Row className="w-full">
      <Column className="w-1/2 pr-2">
        <Img
          src="https://example.com/image1.jpg"
          alt="Image 1"
          width={300}
          height={200}
          className="w-full rounded-lg"
        />
      </Column>
      <Column className="w-1/2 pl-2">
        <Img
          src="https://example.com/image2.jpg"
          alt="Image 2"
          width={300}
          height={200}
          className="w-full rounded-lg"
        />
      </Column>
    </Row>
  </Container>
</Tailwind>`;

// Block 3: Three Column Images
const ThreeColumnImages = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Row className="w-full">
        <Column className="w-1/3 px-1">
          <Img
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&h=200&fit=crop"
            alt="Ocean view"
            width={200}
            height={200}
            className="w-full rounded-lg"
          />
        </Column>
        <Column className="w-1/3 px-1">
          <Img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop"
            alt="Beach"
            width={200}
            height={200}
            className="w-full rounded-lg"
          />
        </Column>
        <Column className="w-1/3 px-1">
          <Img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200&h=200&fit=crop"
            alt="Lake"
            width={200}
            height={200}
            className="w-full rounded-lg"
          />
        </Column>
      </Row>
    </Container>
  </Tailwind>
);

const threeColumnImagesCode = `import { Column, Container, Img, Row, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
    <Row className="w-full">
      <Column className="w-1/3 px-1">
        <Img
          src="https://example.com/image1.jpg"
          alt="Image 1"
          width={200}
          height={200}
          className="w-full rounded-lg"
        />
      </Column>
      <Column className="w-1/3 px-1">
        <Img
          src="https://example.com/image2.jpg"
          alt="Image 2"
          width={200}
          height={200}
          className="w-full rounded-lg"
        />
      </Column>
      <Column className="w-1/3 px-1">
        <Img
          src="https://example.com/image3.jpg"
          alt="Image 3"
          width={200}
          height={200}
          className="w-full rounded-lg"
        />
      </Column>
    </Row>
  </Container>
</Tailwind>`;

// Block 4: Image Grid (2x2)
const ImageGrid = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Section>
        <Row className="mb-2 w-full">
          <Column className="w-1/2 pr-1">
            <Img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=200&fit=crop"
              alt="Travel 1"
              width={300}
              height={200}
              className="w-full rounded-lg"
            />
          </Column>
          <Column className="w-1/2 pl-1">
            <Img
              src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=300&h=200&fit=crop"
              alt="Travel 2"
              width={300}
              height={200}
              className="w-full rounded-lg"
            />
          </Column>
        </Row>
        <Row className="w-full">
          <Column className="w-1/2 pr-1">
            <Img
              src="https://images.unsplash.com/photo-1476900543704-4312b78632f8?w=300&h=200&fit=crop"
              alt="Travel 3"
              width={300}
              height={200}
              className="w-full rounded-lg"
            />
          </Column>
          <Column className="w-1/2 pl-1">
            <Img
              src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=300&h=200&fit=crop"
              alt="Travel 4"
              width={300}
              height={200}
              className="w-full rounded-lg"
            />
          </Column>
        </Row>
      </Section>
    </Container>
  </Tailwind>
);

const imageGridCode = `import { Column, Container, Img, Row, Section, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
    <Section>
      <Row className="mb-2 w-full">
        <Column className="w-1/2 pr-1">
          <Img
            src="https://example.com/image1.jpg"
            alt="Image 1"
            width={300}
            height={200}
            className="w-full rounded-lg"
          />
        </Column>
        <Column className="w-1/2 pl-1">
          <Img
            src="https://example.com/image2.jpg"
            alt="Image 2"
            width={300}
            height={200}
            className="w-full rounded-lg"
          />
        </Column>
      </Row>
      <Row className="w-full">
        <Column className="w-1/2 pr-1">
          <Img
            src="https://example.com/image3.jpg"
            alt="Image 3"
            width={300}
            height={200}
            className="w-full rounded-lg"
          />
        </Column>
        <Column className="w-1/2 pl-1">
          <Img
            src="https://example.com/image4.jpg"
            alt="Image 4"
            width={300}
            height={200}
            className="w-full rounded-lg"
          />
        </Column>
      </Row>
    </Section>
  </Container>
</Tailwind>`;

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
      name: 'Single Image',
      code: singleImageCode,
      codeHtml: await highlightCode(singleImageCode),
      renderedHtml: await renderBlock(SingleImage)
    },
    {
      name: 'Two Column Images',
      code: twoColumnImagesCode,
      codeHtml: await highlightCode(twoColumnImagesCode),
      renderedHtml: await renderBlock(TwoColumnImages)
    },
    {
      name: 'Three Column Images',
      code: threeColumnImagesCode,
      codeHtml: await highlightCode(threeColumnImagesCode),
      renderedHtml: await renderBlock(ThreeColumnImages)
    },
    {
      name: 'Image Grid',
      code: imageGridCode,
      codeHtml: await highlightCode(imageGridCode),
      renderedHtml: await renderBlock(ImageGrid)
    }
  ];
}
