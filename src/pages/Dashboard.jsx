import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to NA DESK</CardTitle>
          <CardDescription>
            Your React + Vite + Tailwind + Redux + shadcn (Base UI) starter is
            ready.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Use the sidebar to navigate between sections. Add your feature code
          under <code>src/store/features</code> and your pages under{" "}
          <code>src/pages</code>.
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
