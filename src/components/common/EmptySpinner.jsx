import { Spinner } from "@/components/ui/spinner";

export function EmptySpinner({ className = "size-8 text-primary" }) {
  return <Spinner className={className} />;
}
