class Calendar {
    constructor() {
        this.startDate = new Date(2024, 0, 1, 0, 0, 0);
        this.endDate = new Date(2024, 11, 31, 23, 59, 59);

        this.$calendar = document.getElementById('calendar');

        this.date = new Date();
        this.locale = document.documentElement.lang;

        this.months = this.getMonthsNames();
        this.days = this.getDaysNames();
        
        this.$globalThead = this.generateThead();

        this.init();
    }

    init() {
        this.$calendar.innerHTML = this.generateTables();
    }

    getMonthsNames() {
        const months = [];
        for (let month = 0; month < 12; month++) {
            const date = new Date(this.date.getFullYear(), month, 1);
            months.push(date.toLocaleString(this.locale, { month: 'long' }));
        }
        return months;
    }

    getDaysNames() {
        const days = [];
        for (let day = 0; day < 7; day++) {
            const date = new Date(this.date.getFullYear(), 0, day + 1);
            days.push(date.toLocaleString(this.locale, { weekday: 'short' }));
        }
        return days;
    }

    generateThead() {
        let $thead = '';
    
        this.days.forEach((day) => {
            $thead += `<th>${day}</th>`;
        });
    
        return $thead;
    }

    generateTables() {
        let tablesHTML = '';

        let currentDate = new Date(this.date);
        while (currentDate <= this.endDate) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const monthName = currentDate.toLocaleString(this.locale, { month: 'long' });

            // Créer un tableau pour ce mois
            let tableHTML = `<div class="month-container"><table><caption>${monthName} ${year}</caption><thead><tr>`;
            this.days.forEach((day) => {
                tableHTML += `<th>${day}</th>`;
            });
            tableHTML += `</tr></thead><tbody>`;

            // Obtenir le premier jour du mois et le dernier jour du mois
            const firstDayOfMonth = new Date(year, month, 0).getDay();
            const lastDateOfMonth = new Date(year, month + 1, -1).getDate();
            const lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();

            let rowHTML = '<tr>';

            // Ajouter les jours du mois précédent si le mois ne commence pas un lundi
            for (let i = 0; i < firstDayOfMonth; i++) {
                const nowDate = new Date(year, month, -(firstDayOfMonth - i - 1));
                const dateIso = nowDate.toISOString().split('T')[0];
                rowHTML += `<td><input type="radio" name="date" value="${dateIso}" id="${dateIso}disabled" disabled><label for="${dateIso}disabled">${nowDate.getDate()}</label></td>`;
            }

            // Ajouter les jours du mois actuel
            for (let i = 1; i <= lastDateOfMonth + 1; i++) {
                const nowDate = new Date(year, month, i);
                const dateIso = nowDate.toISOString().split('T')[0];

                const isPassed = nowDate < this.date;

                rowHTML += `<td><input type="radio" name="date" value="${dateIso}" id="${dateIso}" required${isPassed ? ' disabled' : ''}><label for="${dateIso}">${nowDate.getDate()}</label></td>`;
                if ((firstDayOfMonth + i - 1) % 7 === 6) {
                    tableHTML += `${rowHTML}</tr>`;
                    rowHTML = '<tr>';
                }
            }

            // Ajouter les jours du mois suivant si le mois ne se termine pas un dimanche
            for (let i = 0; i < (6 - lastDayOfMonth); i++) {
                const nowDate = new Date(year, month, lastDateOfMonth + i + 2);
                const dateIso = nowDate.toISOString().split('T')[0];
                rowHTML += `<td><input type="radio" name="date" value="${dateIso}" id="${dateIso}disabled" disabled><label for="${dateIso}disabled">${nowDate.getDate()}</label></td>`;
            }

            tableHTML += `${rowHTML}</tr></tbody></table></div>`;
            tablesHTML += tableHTML;

            // Passer au mois suivant
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return tablesHTML;
    }
}    

const calendar = new Calendar();