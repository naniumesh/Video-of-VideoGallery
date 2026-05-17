// FONT SIZE FUNCTIONALITY

let fontSize = 16;

document.getElementById('increase-font')
.addEventListener('click', function () {

    fontSize += 2;
    document.body.style.fontSize =
        fontSize + 'px';
});

document.getElementById('decrease-font')
.addEventListener('click', function () {

    if (fontSize > 10) {

        fontSize -= 2;

        document.body.style.fontSize =
            fontSize + 'px';
    }
});

document.getElementById('reset-font')
.addEventListener('click', function () {

    fontSize = 16;

    document.body.style.fontSize =
        '16px';
});


// MOBILE NAVIGATION

var navToggle =
    document.getElementById('nav-toggle');

var division3 =
    document.getElementById('division3');

navToggle.addEventListener('click',
function () {

    division3.classList.toggle('active');
});

window.addEventListener('resize',
function () {

    if (window.innerWidth > 600) {

        division3.classList.remove('active');
    }
});


// ===============================
// STUDENT DATA
// ===============================

let people = [];


// ===============================
// LOAD STUDENTS FROM BACKEND
// ===============================

async function loadPeople() {

    try {

        const response =
            await fetch(
                "https://main-lpu-ncc.onrender.com/api/alumni"
            );

        const data =
            await response.json();

        people = data.map(student => ({
            
            id: student.id,
            
            name: student.name,
            
            batch:
            
            student.fromYear
            
            + " - " +
            
            student.toYear,

            field: student.className,

            image: student.imageUrl,

            fromYear: parseInt(student.fromYear)
}));


// SORT OLDEST BATCH FIRST
people.sort((a, b) => {

    return a.fromYear - b.fromYear;

});

        localStorage.setItem(
            "cachedPeople",
            JSON.stringify(people)
        );

        renderPeople(people);

    } catch (error) {

        console.log(
            "Offline Mode"
        );

        const offlineData =
            localStorage.getItem(
                "cachedPeople"
            );

        if (offlineData) {

            people =
                JSON.parse(offlineData);

            renderPeople(people);
        }
    }
}


// ===============================
// CREATE CARD
// ===============================

function createPersonCard(person) {

    const card =
        document.createElement('div');

    card.className =
        'col-12 col-sm-6 col-md-4 col-lg-2 mb-4 person-card shadow fadeIn';

    card.onclick =
        () => displayPersonDetails(person);

    const img =
        document.createElement('img');

    img.src = person.image;

    img.classList.add('img-fluid');

    card.appendChild(img);

    const name =
        document.createElement('h3');

    name.innerText =
        person.name;

    card.appendChild(name);

    const batch =
        document.createElement('p');

    batch.innerText =
        "Batch: " + person.batch;

    card.appendChild(batch);

    const field =
        document.createElement('p');

    field.innerText =
        "Field: " + person.field;

    card.appendChild(field);

    return card;
}


// ===============================
// RENDER PEOPLE
// ===============================

function renderPeople(data) {

    const personListElement =
        document.getElementById(
            'personCards'
        );

    personListElement.innerHTML = '';

    data.forEach(person => {

        const card =
            createPersonCard(person);

        personListElement.appendChild(card);
    });
}


// ===============================
// FILTER + SEARCH
// ===============================

function filterPeople() {

    const field =
        document.getElementById(
            'filterField'
        ).value;

    const search =
        document.getElementById(
            'searchInput'
        ).value
        .toLowerCase();

    const filteredPeople =
        people.filter(person => {

            const matchField =
                field === ""
                ||
                person.field === field;

            const matchSearch =
                person.name
                .toLowerCase()
                .includes(search);

            return matchField && matchSearch;
        });

    renderPeople(filteredPeople);
}


// ===============================
// PERSON DETAILS
// ===============================

function displayPersonDetails(person) {

    document.getElementById(
        'personName'
    ).innerText = person.name;

    document.getElementById(
        'personBatch'
    ).innerText = person.batch;

    document.getElementById(
        'personField'
    ).innerText = person.field;

    document.getElementById(
        'personImage'
    ).src = person.image;

    document.getElementById(
        'personList'
    ).style.display = 'none';

    const detailBox =
        document.getElementById(
            'personDetail'
        );

    detailBox.style.display = 'flex';

    setTimeout(() => {

        detailBox.classList.add('show');

    }, 50);
}

function backToList() {

    const detailBox =
        document.getElementById(
            'personDetail'
        );

    detailBox.classList.remove('show');

    setTimeout(() => {

        detailBox.style.display = 'none';

        document.getElementById(
            'personList'
        ).style.display = 'block';

    }, 500);
}


// ===============================
// CONTACT MODAL
// ===============================

function showContact() {

    let modal =
        document.getElementById(
            "modalOverlay"
        );

    modal.style.display = "flex";

    setTimeout(() => {

        modal.classList.add("active");

    }, 10);
}

function closeContact(event) {

    let modal =
        document.getElementById(
            "modalOverlay"
        );

    if (
        event.target === modal
        ||
        event.target.classList.contains(
            "close-btn"
        )
    ) {

        modal.classList.remove("active");

        setTimeout(() => {

            modal.style.display = "none";

        }, 300);
    }
}


// INITIAL LOAD

loadPeople();