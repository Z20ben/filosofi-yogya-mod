export default function TrendingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* No Navigation Header - Clean content-first layout */}
      {children}
    </>
  );
}
