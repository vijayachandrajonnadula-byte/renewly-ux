type EmptyStateProps = {
  actionLabel: string
  description: string
  onAction: () => void
  title: string
  visualText?: string
}

function EmptyState({ actionLabel, description, onAction, title, visualText }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {visualText ? <div className="empty-state__visual" aria-hidden="true">{visualText}</div> : null}
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="button-secondary" onClick={onAction} type="button">
        {actionLabel}
      </button>
    </div>
  )
}

export default EmptyState
