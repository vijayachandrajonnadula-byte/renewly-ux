type EmptyStateProps = {
  actionLabel: string
  description: string
  onAction: () => void
  title: string
}

function EmptyState({ actionLabel, description, onAction, title }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="button-secondary" onClick={onAction} type="button">
        {actionLabel}
      </button>
    </div>
  )
}

export default EmptyState
