'use client'

import { motion } from 'framer-motion'
import Block from '@/components/ui/Block'
import Input from '@/components/ui/Input'
import { FormData } from '@/lib/formUtils'
import { fadeInUp } from '@/lib/animations'

interface Step3GroupDetailsProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}

const durations = [1, 2, 3, 4, 5, 7, 10, 14]

export default function Step3GroupDetails({
  formData,
  updateFormData,
  onNext,
  onPrev,
}: Step3GroupDetailsProps) {
  const handleGroupSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ groupSize: parseInt(e.target.value) })
  }

  const handleDateChange = (value: string) => {
    updateFormData({
      dates: {
        ...formData.dates,
        start: value,
      },
    })
  }

  const clearDuration = () => {
    updateFormData({ duration: 0 })
  }

  const handleDurationSelect = (days: number) => {
    // If start date exists, calculate end date for backend
    if (formData.dates.start) {
      const startDate = new Date(formData.dates.start)
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + days)
      
      const endDateString = endDate.toISOString().split('T')[0]
      updateFormData({
        duration: days,
        dates: {
          ...formData.dates,
          end: endDateString,
        },
      })
    } else {
      updateFormData({ duration: days })
    }
  }

  const isDurationSet = formData.duration > 0

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="w-full"
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-center text-text-dark">
        Détails du groupe
      </h2>
      <p className="text-sm md:text-base text-gray-600 text-center mb-4">
        Renseignez les informations sur votre groupe
      </p>

      <div className="space-y-3 md:space-y-4 max-w-2xl mx-auto">
        {/* Group Size */}
        <Block className="p-4 md:p-5">
          <label className="block text-sm md:text-base font-semibold mb-3 text-text-dark">
            Taille du groupe : {formData.groupSize === 200 ? '200+' : formData.groupSize} personnes
          </label>
          <input
            type="range"
            min="5"
            max="200"
            value={formData.groupSize}
            onChange={handleGroupSizeChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>5</span>
            <span>200+</span>
          </div>
        </Block>

        {/* Start Date */}
        <Block className="p-4 md:p-5">
          <Input
            label="Date de début"
            type="date"
            value={formData.dates.start}
            onChange={(e) => handleDateChange(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </Block>

        {/* Duration */}
        <Block className="p-4 md:p-5">
          <label className="block text-base font-semibold mb-3 text-text-dark">
            Durée du séjour
          </label>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {durations.map((days) => (
              <button
                key={days}
                onClick={() => handleDurationSelect(days)}
                className={`
                  px-3 py-2 text-sm rounded-lg font-semibold transition-all duration-200
                  ${
                    formData.duration === days
                      ? 'bg-rusker-blue text-white shadow-soft'
                      : 'bg-white text-text-dark border-2 border-gray-200 hover:border-rusker-blue'
                  }
                `}
              >
                {days}j
              </button>
            ))}
          </div>
          {isDurationSet && (
            <button
              onClick={clearDuration}
              className="mt-3 w-full px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
              type="button"
            >
              Effacer durée
            </button>
          )}
        </Block>
      </div>

    </motion.div>
  )
}

