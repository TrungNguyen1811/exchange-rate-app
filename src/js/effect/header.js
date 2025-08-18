document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header')
  const scrollThreshold = 50

  window.addEventListener('scroll', function () {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled')
    } else {
      header.classList.remove('scrolled')
    }
  })
})

const navItems = document.querySelectorAll('.nav__item')

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    const targetId = item.dataset.target
    const section = document.getElementById(targetId)
    if (section) {
      const y = section.getBoundingClientRect().top + window.scrollY - 65
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  })
})
