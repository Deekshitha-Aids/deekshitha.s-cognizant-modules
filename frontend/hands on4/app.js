import { courses } from "./data.js";


const courseGrid = document.querySelector(".course-grid");
const courseLoading = document.querySelector("#course-loading");
const totalCredits = document.querySelector("#total-credits");

const spinner = document.querySelector("#spinner");
const notificationList = document.querySelector("#notification-list");
const errorMessage = document.querySelector("#error-message");
const retryButton = document.querySelector("#retry-btn");


// Axios interceptor (Task 58)

axios.interceptors.request.use(
    config => {
        console.log("API call started:", config.url);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


// Task 45: Promise using fetch().then()

function fetchUser(id) {

    return fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
    )
    .then(response => response.json())
    .then(user => {

        console.log("Promise User:", user.name);

        return user;

    });

}


fetchUser(1);


// Task 46: async/await with try catch

async function fetchUserAsync(id) {

    try {

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );


        if (!response.ok) {

            throw new Error("User not found");

        }


        const user = await response.json();

        console.log("Async User:", user.name);

        return user;


    } catch(error) {

        console.log(error.message);

    }

}


fetchUserAsync(2);


// Task 49: Promise.all()

Promise.all([
    fetchUserAsync(1),
    fetchUserAsync(2)
])
.then(users => {

    console.log(
        "Promise All:",
        users[0].name,
        users[1].name
    );

});


// Task 47: Simulated API delay

function fetchAllCourses() {

    return new Promise(resolve => {

        setTimeout(() => {

            resolve(courses);

        },1000);

    });

}


// Task 48: Render courses after promise resolves

async function loadCourses() {

    courseLoading.textContent =
    "Loading courses...";


    const courseData =
    await fetchAllCourses();


    courseLoading.textContent = "";


    renderCourses(courseData);

}



function renderCourses(courseData) {


    courseGrid.innerHTML = "";


    courseData.forEach(course => {


        const card =
        document.createElement("article");


        card.className = "course-card";


        card.innerHTML = `

            <h3>${course.name}</h3>

            <p>Code: ${course.code}</p>

            <p>Credits: ${course.credits}</p>

            <p>Grade: ${course.grade}</p>

        `;


        courseGrid.appendChild(card);


    });


    const total =
    courseData.reduce(
        (sum,course)=>sum + course.credits,
        0
    );


    totalCredits.textContent =
    `Total Credits: ${total}`;

}


loadCourses();


// Task 50: Reusable Fetch Function

async function apiFetch(url) {


    const response =
    await fetch(url);


    if(!response.ok) {

        throw new Error(
            `Error: ${response.status}`
        );

    }


    return await response.json();

}



// Task 51,52,53 Notifications

async function loadNotifications() {


    try {


        spinner.style.display = "block";

        errorMessage.textContent = "";

        retryButton.style.display = "none";


        const posts =
        await apiFetch(
        "https://jsonplaceholder.typicode.com/posts"
        );


        spinner.style.display = "none";


        renderNotifications(
            posts.slice(0,5)
        );


    }
    catch(error) {


        spinner.style.display = "none";


        errorMessage.textContent =
        "Unable to load notifications. Please try again.";


        retryButton.style.display = "block";


    }

}



function renderNotifications(posts) {


    notificationList.innerHTML = "";


    posts.forEach(post => {


        const card =
        document.createElement("article");


        card.className = "course-card";


        card.innerHTML = `

            <h3>${post.title}</h3>

            <p>${post.body}</p>

        `;


        notificationList.appendChild(card);


    });

}


loadNotifications();


retryButton.addEventListener(
    "click",
    loadNotifications
);



// Task 56 & 57: Axios API call

async function loadUserPosts() {


    try {


        const response =
        await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
                params:{
                    userId:1
                }
            }
        );


        console.log(
            "Axios User 1 Posts:",
            response.data
        );


    }
    catch(error) {

        console.log(
            "Axios Error:",
            error.message
        );

    }

}


loadUserPosts();


