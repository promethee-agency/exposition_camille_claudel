class Form {
    constructor() {
        this.locale = document.documentElement.lang;
        this.form = document.querySelector('form[name="reservation"]');

        this.recap = this.form.querySelector('.recap .ticket');

        this.ticketPerReservation = this.form.querySelector('span[data-ticket-per-reservation]').dataset['ticketPerReservation'];
        this.categories = this.form.querySelectorAll('fieldset[data-category]');

        this.ticketCollection = document.getElementById('reservation_tickets').dataset['prototype'];

        this.ticketsCount = 0;

        this.incrementalId = 0;
        this.incrementalPad = 3;

        this.categories.forEach((category) => {
            const categoryId = category.dataset['category'];

            const $add = category.querySelector('button[data-action="add"]');
            const $remove = category.querySelector('button[data-action="remove"]');
            const $counter = document.getElementById('counter_' + categoryId);
            const $ticket = category.querySelector('.tickets');

            this.ticketsCount += $counter.value;

            $add.addEventListener('click', () => this.addElement($counter, $ticket));
            $remove.addEventListener('click', () => this.removeElement($counter, $ticket));
        });

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.onSubmit();
        });

        this.form.addEventListener('change', (event) => {
            const $checkedDate = this.form.querySelector('#calendar input[type="radio"]:checked');
            const $checkedHour = this.form.querySelector('#reservation_hours input[type="radio"]:checked');

            if ($checkedDate) {
                let date = new Date($checkedDate.value);
                date.setDate(date.getDate() + 1);
                document.getElementById('recap__date').innerText = date.toLocaleDateString(this.locale);
            }

            if ($checkedHour) {
                let [hourDigit, minuteDigit] = $checkedHour.value.split(':');
                let hour = new Date();
                hour.setHours(hourDigit);
                hour.setMinutes(minuteDigit);
                document.getElementById('recap__hour').innerText = hour.toLocaleTimeString(this.locale, { hour: 'numeric', minute: '2-digit' });
            }
        });
    }

    onSubmit = () => {
        const $categories = this.form.querySelectorAll('section.categories > div > fieldset[data-category]');
        const $dateInput = document.getElementById('reservation_reservationAt');
        const $selectedDate = this.form.querySelector('#calendar input[type="radio"]:checked');
        const $radioButtons = this.form.querySelectorAll('#calendar input[type="radio"]');
        const attrToReplace = [
            {
                "html":"id",
                "js":"id"
            },
            {
                "html":"name",
                "js":"name"
            },
            {
                "html":"for",
                "js":"htmlFor"
            }
        ];
        
        $dateInput.value = $selectedDate.value;

        $radioButtons.forEach(($radioButton) => {
            $radioButton.disabled = true;
        });

        let counter = 0;

        $categories.forEach(($category) => {
            const $tickets = $category.querySelectorAll('.tickets > div');
            const categoryId = $category.dataset['category'];

            $tickets.forEach(($ticket) => {
                attrToReplace.forEach((attr) => {
                    const $prototypes = $ticket.querySelectorAll(`[${attr.html}*="__name__"]`);

                    $prototypes.forEach(($prototype) => {
                        $prototype[attr.js] = $prototype[attr.js].replace('__name__', counter);
                        $prototype[attr.js] = $prototype[attr.js].replace('__name__', '0');
                    });
                });

                const $select = document.getElementById(`reservation_tickets_${counter}_category`);
                $select.value = categoryId;

                counter++;
            });
        });

        this.form.submit();
    }

    updateRecapBill = () => {
        const $recapBill = document.getElementById('recap__bill');
        const $recapBillTotal = document.getElementById('recap__bill_total');
        let recapBillInner = '';
        let totalPrice = 0;

        this.categories.forEach((category) => {
            const price = (category.querySelector('span[data-price]')).dataset['price'];
            const name = (category.querySelector('span[data-name]')).dataset['name'];
            const ticketsCount = (category.querySelector('.tickets')).childElementCount;

            if (ticketsCount) {
                totalPrice += price * ticketsCount;
                recapBillInner += `<tr><th scope="row">${name} : </th><td>×${ticketsCount}</td></tr>`;
            }
        });

        $recapBill.innerHTML = recapBillInner;
        $recapBillTotal.innerText = totalPrice + '€';
    }

    addElement = ($counter, $tickets) => {
        if (this.ticketsCount < this.ticketPerReservation) {
            const attrToReplace = [
                {
                    "html":"id",
                    "js":"id"
                },
                {
                    "html":"for",
                    "js":"htmlFor"
                }
            ];

            this.ticketsCount++;
            $counter.value++;

            let $newTicket = document.createElement('div');
            $newTicket.innerHTML = this.ticketCollection;
            $newTicket = $newTicket.firstChild;

            const $userCollection = $newTicket.querySelector('div[data-prototype]');

            let $newUser = document.createElement('div');
            $newUser.innerHTML = $userCollection.dataset['prototype'];

            attrToReplace.forEach((attr) => {
                const $prototypes = $newUser.querySelectorAll(`[${attr.html}*="__name__"]`);

                $prototypes.forEach(($prototype) => {
                    $prototype[attr.js] += String(this.incrementalId).padStart(this.incrementalPad, '0');
                });
            });

            this.incrementalId++

            $newUser = $newUser.firstChild;

            $newTicket.firstChild.appendChild($newUser)

            $tickets.appendChild($newTicket);

            this.updateRecapBill();
        }
    }

    removeElement = ($counter, $tickets) => {
        if ($counter.value > 0) {
            this.ticketsCount--;
            $counter.value--;

            $tickets.removeChild($tickets.lastElementChild);

            this.updateRecapBill();
        }
    }
}

window.addEventListener('DOMContentLoaded', function () {
    const form = new Form();
});