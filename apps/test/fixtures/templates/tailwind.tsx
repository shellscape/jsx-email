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
      href="https://example.com"
      className="px-3 py-2 font-medium leading-4 text-white bg-brand"
    >
      Click me
    </Button>
  </Tailwind>
);
