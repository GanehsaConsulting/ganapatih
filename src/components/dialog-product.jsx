import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export const ProductDialog = ({
  open,
  onOpenChange,
  title = "Detail Produk",
  description,
  content,
  footer,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent variant="bottom">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-4 min-h-[60lvh]">
          {content}
        </div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
