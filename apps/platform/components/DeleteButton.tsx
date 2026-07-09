'use client'

type Props = {
  action: string
  confirmText: string
  label: string
  className?: string
}

/** Posts to an admin delete endpoint after a native confirm. */
export default function DeleteButton({ action, confirmText, label, className }: Props) {
  return (
    <form
      action={action}
      method="post"
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault()
      }}
      className="inline"
    >
      <button
        type="submit"
        className={className ?? 'text-red-600 hover:underline'}
      >
        {label}
      </button>
    </form>
  )
}
