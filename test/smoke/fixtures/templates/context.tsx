import { createContext, useContext, Body, Html } from 'jsx-email';

export const TemplateName = 'local-assets';

const context = createContext(123);

export const Template = () => {
  const value = useContext(context);

  return (
    <Html>
      <Body>{value}</Body>
    </Html>
  );
};
