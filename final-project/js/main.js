// Fake Minesweeper interaction: reveal tile content on click

window.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('fake-minesweeper')
  if (!grid) return

  grid.addEventListener('click', (e) => {
    const tile = e.target.closest('.ms-tile')
    if (!tile) return

    // already revealed? do nothing
    if (tile.classList.contains('revealed')) return

    const content = tile.getAttribute('data-content') || ''
    tile.textContent = content
    tile.classList.add('revealed')
  })
})
