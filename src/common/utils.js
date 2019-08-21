export const formattedPrice = totalPrice => {
  if (global.Intl) {
    const formatter = new global.Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })

    return formatter.format(totalPrice)
  } else {
    return `$${totalPrice}`
  }
}

export const formattedHours = totalDuration => {
  if (totalDuration === 0) {
    return '0 HRS'
  } else if (totalDuration <= 60) {
    return '1 HR'
  } else {
    const hours = Math.round(totalDuration / 60)
    return `${hours} HRS`
  }
}
