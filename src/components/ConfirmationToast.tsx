type ConfirmationToastProps = {
  message: string
}

function ConfirmationToast({ message }: ConfirmationToastProps) {
  return (
    <div className="confirmation-toast" role="status" aria-live="polite">
      {message}
    </div>
  )
}

export default ConfirmationToast
