import { useState, useMemo, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { TimeSlot } from "@/data/categoryData"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, RotateCcw, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { translate } from "@/lib/i18n-utils"
import { useTranslation } from "react-i18next"

interface TimelineProps {
  slots: TimeSlot[]
  title: string
  onSlotClick: (slot: TimeSlot) => void
}

const ITEMS_PER_PAGE = 5

import { InfoTip } from "@/components/ui/InfoTip"

export function Timeline({ slots, title, onSlotClick }: TimelineProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const { t } = useTranslation(["dashboard", "common"])

  const filteredSlots = useMemo(() => {
    return slots.filter((slot) => {
      const truck = translate(t, slot.truck)
      const info = translate(t, slot.info)
      const details = translate(t, slot.details)

      const matchesSearch =
        truck.toLowerCase().includes(search.toLowerCase()) ||
        info.toLowerCase().includes(search.toLowerCase()) ||
        details.toLowerCase().includes(search.toLowerCase()) ||
        (slot.location && slot.location.toLowerCase().includes(search.toLowerCase()))

      const matchesStatus = statusFilter === "all" || slot.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [slots, search, statusFilter, t])

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, statusFilter])

  const totalPages = Math.ceil(filteredSlots.length / ITEMS_PER_PAGE)
  const paginatedSlots = filteredSlots.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleReset = () => {
    setSearch("")
    setStatusFilter("all")
  }

  const getStatusBadge = (status: TimeSlot["status"]) => {
    switch (status) {
      case "recommended":
        return <Badge className="bg-success text-success-foreground hover:bg-success/90">{t("dashboard:timeline.status.recommended")}</Badge>
      case "critical":
        return <Badge variant="destructive" className="animate-pulse">{t("dashboard:timeline.status.critical")}</Badge>
      case "busy":
        return <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">{t("dashboard:timeline.status.busy")}</Badge>
      default:
        return <Badge className="bg-blue-500 text-white hover:bg-blue-600">{t("dashboard:timeline.status.free")}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-bold text-foreground">
            {title.includes(":") ? t(title as any) : title}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("dashboard:timeline.searchPlaceholder")}
              className="pl-9 rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select key="timeline-status-select" value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] rounded-xl text-foreground">
              <SelectValue placeholder={t("dashboard:timeline.status.all")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("dashboard:timeline.status.all")}</SelectItem>
              <SelectItem value="free">{t("dashboard:timeline.status.free")}</SelectItem>
              <SelectItem value="recommended">{t("dashboard:timeline.status.recommended")}</SelectItem>
              <SelectItem value="busy">{t("dashboard:timeline.status.busy")}</SelectItem>
              <SelectItem value="critical">{t("dashboard:timeline.status.critical")}</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            className="rounded-xl"
            title={t("common:reset")}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 border-b-border">
                  <TableHead className="w-[100px] text-foreground font-semibold">{t("dashboard:timeline.headers.time")}</TableHead>
                  <TableHead className="text-foreground font-semibold">{t("dashboard:timeline.headers.truck")}</TableHead>
                  <TableHead className="hidden md:table-cell text-foreground font-semibold">{t("dashboard:timeline.headers.details")}</TableHead>
                  <TableHead className="text-foreground font-semibold">{t("dashboard:timeline.headers.status")}</TableHead>
                  <TableHead className="text-right text-foreground font-semibold">{t("dashboard:timeline.headers.action")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSlots.length > 0 ? (
                  paginatedSlots.map((slot, index) => (
                    <TableRow
                      key={slot.id}
                      className="cursor-pointer transition-colors hover:bg-muted/30 border-b-border"
                      onClick={() => onSlotClick(slot)}
                    >
                      <TableCell className="font-bold text-foreground">{slot.time}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">
                            {translate(t, slot.truck)}
                          </span>
                          <span className="text-xs text-muted-foreground">{slot.location}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm text-foreground/90">
                            {translate(t, slot.info)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {translate(t, slot.details)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(slot.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="rounded-lg font-semibold border-primary/30 text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                          {t("dashboard:timeline.detailsButton")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground font-medium">
                      {t("dashboard:timeline.noEntries")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination Controls */}
        {filteredSlots.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between px-2">
            <div className="text-xs text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-lg"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-lg"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
