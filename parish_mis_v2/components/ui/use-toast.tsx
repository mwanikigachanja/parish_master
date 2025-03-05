// Shadcn UI toast component
import { useToast as useToastOriginal } from "@/components/ui/toast"

export { useToast }

function useToast() {
  return useToastOriginal()
}

