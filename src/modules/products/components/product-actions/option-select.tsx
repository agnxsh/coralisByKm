import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import { RulerIcon } from "lucide-react"
import React, { useState } from "react"
import SizeGuideModal from "../size-guide-modal"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
  metadata?: Record<string, unknown> | null
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
  metadata,
}) => {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  const handleSizeGuideClick = () => {
    setIsSizeGuideOpen(true)
  }

  const handleCloseSizeGuide = () => {
    setIsSizeGuideOpen(false)
  }

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex justify-between">
        <span className="text-sm">Select {title}</span> 
        {title === 'Size' && (
          <span 
            className="text-xs underline flex gap-1 items-center cursor-pointer hover:text-ui-fg-interactive"
            onClick={handleSizeGuideClick}
          >
            <RulerIcon className="w-4 h-4" /> Size Guide
          </span>
        )}
      </div>
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "border-ui-border-base bg-ui-bg-subtle border text-small-regular h-10 rounded-rounded p-2 flex-1 ",
                {
                  "border-ui-border-interactive": v === current,
                  "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
                    v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
      
      <SizeGuideModal 
        isOpen={isSizeGuideOpen}
        onClose={handleCloseSizeGuide}
        url={metadata?.size_guide as string}
      />
    </div>
  )
}

export default OptionSelect
