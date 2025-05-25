import { useLocalStorageState } from "ahooks";
import { FileImage, Info, Link, MapPinned } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const STEPS: {
  id: number;
  step: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    id: 1,
    step: "Step 1",
    description: "Select place on the map you want to mark and share.",
    icon: <MapPinned size={50} />,
  },
  {
    id: 2,
    step: "Step 2",
    description: "Upload or make a photo of the place.",
    icon: <FileImage size={50} />,
  },
  {
    id: 3,
    step: "Step 3",
    description: "Share the link with your friends.",
    icon: <Link size={50} />,
  },
];

const WelcomeMessage = () => {
  const [firstVisit, setFirstVisit] = useLocalStorageState<string | undefined>(
    "point-and-pic-first-visit",
    {
      defaultValue: "true",
    },
  );
  const [open, setOpen] = useState(() => firstVisit === "true");

  const onClose = () => {
    setFirstVisit("false");
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-1 right-1"
        onClick={onOpen}
      >
        <Info />
      </Button>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          style={{
            maxWidth: "768px",
          }}
        >
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-center">
              Welcome to Point & Pic
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-2 text-center">
              <span>
                With this application, you can easily create and share
                coordinates and image with your friends.
              </span>
              <strong>See, how it works:</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {STEPS.map((step) => (
              <Card key={step.id}>
                <CardHeader className="space-y-2">
                  <CardTitle className="flex justify-center">
                    <Badge className="text-md px-2 py-1.5">{step.step}</Badge>
                  </CardTitle>
                  <CardDescription className="text-center">
                    {step.description}
                  </CardDescription>
                  <CardContent className="px-0">
                    <div className="text-l text-primary flex w-full justify-center">
                      {step.icon}
                    </div>
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-muted-foreground flex flex-col justify-center gap-1.5">
            <small className="text-center text-balance">
              No registration is required. No tracking is used. All happens in
              your browser.
            </small>
            <small className="text-center text-balance">
              The location and image are stored in link. As soon as a link is
              lost or the browser is closed, the data is deleted.
            </small>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={onClose}>Start using</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WelcomeMessage;
