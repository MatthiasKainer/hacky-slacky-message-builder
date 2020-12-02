window.addEventListener("load", () => {
    document.querySelector("[name=blocks]").addEventListener("blur", (ev) => {
        ev.target.value = JSON.stringify(JSON.parse(ev.target.value), undefined, 4)
    })
})