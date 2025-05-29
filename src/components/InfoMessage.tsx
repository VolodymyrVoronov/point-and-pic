import { Info } from "lucide-react";
import { useState } from "react";

import { STEPS, URL_PARAMS_TO_CHECK } from "@/constants";
import useFirstVisit from "@/hooks/useFirstVisit";
import checkURLParams from "../helpers/checkURLParams";

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

const InfoMessage = () => {
  const urlParamsExists = checkURLParams(URL_PARAMS_TO_CHECK);

  const { isFirstVisit, setFirstVisit } = useFirstVisit();
  const [open, setOpen] = useState(() => {
    if (isFirstVisit && !urlParamsExists) {
      return true;
    } else {
      return false;
    }
  });

  const onClose = () => {
    setFirstVisit("false");
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {!urlParamsExists && (
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-1 right-1"
          onClick={onOpen}
          style={{
            zIndex: 9999,
          }}
        >
          <Info />
        </Button>
      )}

      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          style={{
            maxWidth: "768px",
            zIndex: 9999,
          }}
        >
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-center">
              {isFirstVisit && "Welcome to "}
              Point & Pic
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-2 text-center text-balance">
              <span>
                With this application, you can easily create and share
                coordinates and photo with your friends.
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
              The location and photo are stored in link. As soon as a link is
              lost or the browser is closed, the data is deleted.
            </small>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={onClose}>Understood</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfoMessage;
