export default function WhiteBoxSection({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={`w-full flex flex-col gap-4 mobile:p-2 rounded-xl bg-white p-6 shadow-[inset_0px_4px_2px_rgba(0,0,0,0.3),0px_4px_4px_rgba(0,0,0,0.3)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
