import { Button, Tailwind } from 'jsx-email';

export const Template = () => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            brand: '#007291'
          }
        }
      }
    }}
  >
    <Button
      width={200}
      height={40}
      textColor="#FFFFFF"
      backgroundColor="#007291"
      href="https://example.com"
      className="font-medium leading-4"
    >
      Click me
    </Button>
  </Tailwind>
);
