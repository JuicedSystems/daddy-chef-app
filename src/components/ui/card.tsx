import * as React from "react"
import { View, Text, type ViewProps } from "react-native"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
    ({ className, ...props }, ref) => (
        <View
            ref={ref}
            // @ts-ignore
            className={cn(
                "rounded-lg border bg-card shadow-sm",
                className
            )}
            {...props}
        />
    )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
    ({ className, ...props }, ref) => (
        <View
            ref={ref}
            // @ts-ignore
            className={cn("flex flex-col space-y-1.5 p-6", className)}
            {...props}
        />
    )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<React.ElementRef<typeof Text>, ViewProps & { className?: string }>(
    ({ className, ...props }, ref) => (
        <Text
            ref={ref}
            // @ts-ignore
            className={cn(
                "text-2xl font-semibold leading-none tracking-tight text-card-foreground",
                className
            )}
            {...props}
        />
    )
)
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
    ({ className, ...props }, ref) => (
        // @ts-ignore
        <View ref={ref} className={cn("p-6 pt-0", className)} {...props} />
    )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
    ({ className, ...props }, ref) => (
        <View
            ref={ref}
            // @ts-ignore
            className={cn("flex-row items-center p-6 pt-0", className)}
            {...props}
        />
    )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardContent }
