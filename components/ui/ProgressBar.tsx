'use client'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  // Step 1 shows 0%, then progress increases from step 2 onwards
  const progress = currentStep === 1 ? 0 : ((currentStep - 1) / totalSteps) * 100

  return (
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
      <div
        className="h-full bg-rusker-blue transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

