const cards = document.querySelectorAll(".card")

const observerProducts = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("card--show")
        }
    })
    console.log(entries)
}, {
    threshold: .3
})

cards.forEach(card => {
    observerProducts.observe(card)
})
