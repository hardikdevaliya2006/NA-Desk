import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const NADesk = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardContent>
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="relative min-w-0 flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="na-desk-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search..."
                className="pl-8"
              />
            </div>
            <Button
              type="button"
              onClick={() => navigate("/na-desk/create")}
              className="shrink-0 gap-1.5"
            >
              <Plus />
              Create
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NADesk;
