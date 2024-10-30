import { ErrorMessage } from '@hookform/error-message';

export default function FormErrorComp({
  name,
  errors,
}: {
  name: string;
  errors: {
    [x: string]: unknown;
  };
}) {
  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={({ messages }) => {
        return (
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p className="text-red-600" key={type}>
              {message}
            </p>
          ))
        );
      }}
    />
  );
}
