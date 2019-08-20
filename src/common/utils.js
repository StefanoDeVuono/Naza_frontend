export const formattedCost = totalCost => {
  if (global.Intl) {
    const formatter = new global.Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })

    return formatter.format(totalCost)
  } else {
    return `$${totalCost}`
  }
}

export const formattedHours = totalDuration => {
  if (totalDuration <= 60) {
    return '1 HR'
  } else {
    const hours = Math.round(totalDuration / 60)
    return `${hours} HRS`
  }
}
