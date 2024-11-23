import { ArrowLeft } from "lucide-react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { Separator } from "./separator";

export function FileHeader({ title, filename, actions }) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="font-medium">{filename}</p>
          </div>
        </div>
        <Separator orientation="vertical" className="mx-6 h-6" />
        <div className="flex flex-1 items-center justify-end space-x-2">
          {actions}
        </div>
      </div>
    </div>
  );
}