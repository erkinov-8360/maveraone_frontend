"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}

export function DatePicker({ date, onDateChange, placeholder = "Sanani tanlang", className }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5B546] focus:border-transparent transition-all h-12 text-left flex items-center justify-between bg-white",
            !date && "text-gray-400",
            className
          )}
        >
          <span>{date ? format(date, "dd/MM/yyyy") : placeholder}</span>
          <CalendarIcon className="h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
