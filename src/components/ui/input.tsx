import * as React from "react"
import { TextInput, type TextInputProps } from "react-native"
import { cn } from "@/lib/utils"

export interface InputProps extends TextInputProps {
    className?: string
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <TextInput
                // @ts-ignore
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
                    className
                )}
                placeholderTextColor="#5C6B63" // muted-foreground
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
