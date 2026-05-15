type ConfirmationToastProps = {
  message: string
  onClose?: () => void
  type?: 'success' | 'warning' | 'info'
}

function ConfirmationToast({ message, onClose, type = 'success' }: ConfirmationToastProps) {
  return (
    <div className={`confirmation-toast confirmation-toast--${type}`} role="status" aria-live="polite">
      <span>{message}</span>
      {onClose ? (
        <button
          aria-label="Dismiss message"
          className="confirmation-toast__close"
          onClick={onClose}
          type="button"
        >
          Close
        </button>
      ) : null}
    </div>
  )
}

export default ConfirmationToast
