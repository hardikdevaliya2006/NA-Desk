import { Palette } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COLOR_PRESETS } from "./colors";
import { useColor } from "./ColorProvider";

export function ColorPicker() {
  const { color, setColor } = useColor();
  const availableColors = COLOR_PRESETS.filter(
    (preset) => preset.id !== color,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label="Change accent color"
          />
        }
      >
        <Palette className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Change accent color</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Accent color</DropdownMenuLabel>
          {availableColors.map((preset) => (
            <DropdownMenuItem
              key={preset.id}
              onClick={() => setColor(preset.id)}
            >
              <span
                className="size-3.5 shrink-0 rounded-full border"
                style={{ backgroundColor: preset.swatch }}
              />
              {preset.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
