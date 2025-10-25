const ProgressBar = ({ current, total, percentage }) => {
  // Color basado en el porcentaje
  const getColor = () => {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 50) return 'bg-yellow-500'
    if (percentage >= 20) return 'bg-orange-500'
    return 'bg-gray-300'
  }

  return (
    <div className="flex items-center gap-3 flex-1">
      <div className="flex-1 bg-gray-200 rounded-full h-4 border border-gray-300">
        <div
          className={`h-full rounded-full ${getColor()} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="text-sm font-semibold whitespace-nowrap">
        {percentage}% lleno
      </span>
    </div>
  )
}

export default ProgressBar