import { Calendar } from "lucide-react";
import React, { forwardRef } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <Button
    type="button"
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-transparent text-primary justify-between mt-1 font-normal",
      value ? "text-primary" : "text-muted-foreground"
    )}
    onClick={onClick}
    ref={ref}
  >
    <span className="mr-2">
      {value ? format(value, "PPpp") : "Select Date and Time"}
    </span>
    <Calendar
      className={cn(
        "w-4 h-4",
        value ? "text-primary" : "text-muted-foreground"
      )}
    />
  </Button>
));

CustomInput.displayName = "CustomInput";

export default CustomInput;
