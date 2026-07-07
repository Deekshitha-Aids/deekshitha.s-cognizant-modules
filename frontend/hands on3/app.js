import { courses } from "./data.js";

// ES6 Destructuring
courses.forEach(course => {
    const { name, credits } = course;
    console.log(name, credits);
});

// map()
const formattedCourses = courses.map(
    course => `${course.code} — ${course.name} (${course.credits} credits)`
);

console.log(formattedCourses);

// filter()

const filteredCourses = courses.filter(
    course => course.credits >= 4
);

console.log(filteredCourses.length);

// reduce()

const totalCredits = courses.reduce(
    (sum, course) => sum + course.credits,
    0
);

console.log(totalCredits);

// DOM

const courseGrid = document.querySelector(".course-grid");

const totalCreditsText =
document.querySelector("#total-credits");

const searchInput =
document.querySelector("#search-courses");

const sortButton =
document.querySelector("#sort-btn");

const selectedCourse =
document.querySelector("#selected-course");

// Render Function

function renderCourses(courseList){

    courseGrid.innerHTML="";

    courseList.forEach(course=>{

        const article =
        document.createElement("article");

        article.className="course-card";

        article.dataset.id=course.id;

        article.innerHTML=`
        <h3>${course.name}</h3>
        <p>${course.code}</p>
        <p>Credits : ${course.credits}</p>
        `;

        courseGrid.appendChild(article);

    });

    const total = courseList.reduce(
        (sum,course)=>sum+course.credits,
        0
    );

    totalCreditsText.textContent=
    `Total Credits : ${total}`;
}

renderCourses(courses);

// Search

searchInput.addEventListener("input",()=>{

    const keyword=
    searchInput.value.toLowerCase();

    const result=
    courses.filter(course=>
    course.name.toLowerCase().includes(keyword)
    );

    renderCourses(result);

});

// Sort

sortButton.addEventListener("click",()=>{

    const sorted=[...courses];

    sorted.sort(
        (a,b)=>b.credits-a.credits
    );

    renderCourses(sorted);

});

// Event Delegation

courseGrid.addEventListener("click",(event)=>{

const card=
event.target.closest(".course-card");

if(!card) return;

const id=
Number(card.dataset.id);

const course=
courses.find(c=>c.id===id);

selectedCourse.textContent=
`Selected Course : ${course.name} | Grade : ${course.grade}`;

});