interface Props {
  className?: string;
}

export default function PhotoSkeleton({ className = '' }: Props) {
  return (
    <div
      className={`absolute inset-0 animate-pulse bg-gray-200 ${className}`}
      aria-hidden="true"
    />
  );
}