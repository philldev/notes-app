import { Button } from "./ui/button";

export function NoteToolbar() {
  return (
    <div className="p-4">
      <Button variant="outline" size="sm">
        Delete note
      </Button>
    </div>
  );
}
