import { View, Text, type ViewProps } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary",
                secondary:
                    "border-transparent bg-secondary",
                destructive:
                    "border-transparent bg-destructive",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const badgeTextVariants = cva(
    "text-xs font-semibold",
    {
        variants: {
            variant: {
                default: "text-primary-foreground",
                secondary: "text-secondary-foreground",
                destructive: "text-destructive-foreground",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends ViewProps,
    VariantProps<typeof badgeVariants> {
    className?: string
}

function Badge({ className, variant, children, ...props }: BadgeProps) {
    return (
        <View
            // @ts-ignore
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        >
            <Text
                // @ts-ignore
                className={cn(badgeTextVariants({ variant }))}
            >
                {children}
            </Text>
        </View>
    )
}

export { Badge, badgeVariants }
