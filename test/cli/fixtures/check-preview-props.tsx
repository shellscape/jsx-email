interface PreviewProps {
  label: string;
}

export const previewProps: PreviewProps = {
  label: 'Preview props loaded'
};

export const Template = ({ label }: PreviewProps) => <div>{label.toUpperCase()}</div>;
