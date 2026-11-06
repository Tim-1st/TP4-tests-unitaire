const banner = document.querySelector("[data-testid=\"banner\"]")

const routeFullName = {
    "dev": "développement web et dispositifs interactifs",
    "crea": "création numérique",
    "strat": "stratégie de communication numérique et design d’expérience",
};

document
    .querySelector("[data-form]")
    .addEventListener("submit", (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries())
        const bannerTextTpl = banner.querySelector('p').innerHTML;

        console.log("--------- form's values ---------")
        console.log(JSON.stringify(formValues))
        console.log(document.querySelector("[data-file]")
)
        console.log("------------------------------------")

        banner.querySelector('p').innerHTML = bannerTextTpl.replace(
            "__route_placeholder__",
            routeFullName[formValues.parcours]
        )
        banner.classList.remove("hidden")
        document.cookie = `parcours=${formValues.parcours}; path=/`;
        document.querySelector('[data-reselect-link]').inert = false;

        // e.target.elements contient tous les champs du formulaire
        Array.from(e.target.elements)
            .forEach((item) => {
                item.inert = true;
        })
})

// Partie 7 afficher les jours fériés de l'API
const holidaysList = document.querySelector("[data-holidays-list]");
const holidayTemplate = document.querySelector("[data-holiday-template]");

const loadHolidays = async () => {
    const response = await fetch("/api");
    const holidays = await response.json();

    holidays.forEach((holiday) => {
        const clone = holidayTemplate.content.cloneNode(true);
        clone.querySelector("[data-holiday-date]").textContent = holiday.date;
        clone.querySelector("[data-holiday-name]").textContent = holiday.name;
        holidaysList.append(clone);
    });
};

loadHolidays();
