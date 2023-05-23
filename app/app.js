// var users = [
//     {
//         id: 1,
//         name: 'Song Toan',
//     },
//     {
//         id: 2,
//         name: 'Ha My',
//     },
//     {
//         id: 3,
//         name: 'Cong Chua',
//     },
// ]

// var comments = [
//     {
//         id: 1,
//         user_id: 1,
//         content: 'Em ngu ngon <3',
//     },
//     {
//         id: 2,
//         user_id: 2,
//         content: 'Anh cung ngu ngon <3',
//     },
//     {
//         id: 3,
//         user_id: 1,
//         content: 'Yeu em <3',
//     },
// ]

// function getComments() {
//     return new Promise(function(resolve) {
//         setTimeout(function() {
//             resolve(comments)
//         }, 1000);
//     });
// }

// function getUsersByIds(userIds) {
//     return new Promise(function(resolve) {
//         setTimeout(function() {
//             var result = users.filter(function(user) {
//                 return userIds.includes(user.id);
//             });
//             resolve(result);
//         }, 1000);
//     });
// }

// getComments()
//     .then(function(comments) {
//         var userIds = comments.map(function(comment) {
//             return comment.user_id;
//         });

//         return getUsersByIds(userIds)
//             .then(function(users) {
//                 return {
//                     users: users,
//                     comments: comments,
//                 };
//             });
//     })
    
//     .then(function(data) {
//         var commentBlock = document.getElementById('comment-block');
//         var html = '';
//         data.comments.forEach(function(comment) {
//             var user = data.users.find(function(user) {
//                 return comment.user_id == user.id;
//             });
//             return html += `<li>${user.name}: ${comment.content}</li>`
//         });

//         commentBlock.innerHTML = html;

//     });



// fetch('http://localhost:3000/posts')
//     .then(response =>response.json())
//     .then(posts => {
//         var userIds = posts.map(post => post.userId);
//         return fetch('http://localhost:3000/users')
//             .then(response => response.json())
//             .then(users => {
//                 return {
//                     users: users,
//                     posts: posts,
//                 }
//             })
//     })
//     .then(data => {
//         var postBlock = document.getElementById('post-block');
//         var html = '';
//         data.posts.forEach(post => {
//             var user = data.users.find(user => post.userId == user.id);
//             return html +=
//             `<div id="post-item" style="background: #ccc;">
//                 <h1>${user.name}</h1>
//                 <h3>${post.title}</h2>
//                 <p>${post.body}</p>
//             </div>`
//         });

//         postBlock.innerHTML = html;
//     });


// Thêm/sửa/xóa khóa học với Fetch và REST API

var apiCourses = "http://localhost:3000/courses"

function start() {
    getCourses(renderCourse);

    handleCreateForm();

}

start()



function getCourses(callback) {
    fetch(apiCourses)
        .then(response => response.json())
        .then(callback)
}

function renderCourse(courses) {
    var courseBlock = document.querySelector("#course-block");
    var html = courses.map(course => {
        return `
        <div id="course-${course.id}">
            <h2 class="title-course-${course.id}">${course.title}</h2>
            <p class="description-course-${course.id}">${course.description}</p>
            <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
            <button onclick="handleEditCourse(${course.id})">Sửa</button>
        </div>
        `
    })
    courseBlock.innerHTML = html.join('');
    console.log(courses);
}

function creatCourse(data, callback) {

    fetch(apiCourses, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(callback)
}


function handleCreateForm() {
    var addBtn = document.querySelector('.addBtn');
    addBtn.onclick = function() {
        var nameCourse = document.querySelector('.name').value;
        var descriptionCourse = document.querySelector('.description').value;
    
        var data = {
            title: nameCourse,
            description: descriptionCourse
        }
        creatCourse(data, (course) => {
            var courseBlock = document.querySelector("#course-block");
            var newCourse = document.createElement("div");
            newCourse.setAttribute('id', `course-${course.id}`);
            newCourse.innerHTML = `
                <h2 class="title-course-${course.id}">${course.title}</h2>
                <p class="description-course-${course.id}">${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
                <button onclick="handleEditCourse(${course.id})">Sửa</button>
            `
            courseBlock.appendChild(newCourse);
            console.log(newCourse)
        });
    };
}

function handleDeleteCourse(id) {
    fetch(apiCourses + `/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .then(function(courses) {
        var deletedElement = document.querySelector('#course-' + id);
        
        deletedElement.remove();
    })
}

function handleEditCourse(id) {
    var title = document.querySelector('.title-course-' + id).innerHTML;
    var description = document.querySelector('.description-course-' + id).innerHTML;
    var nameCourse = document.querySelector('.name');
    var descriptionCourse = document.querySelector('.description');

    nameCourse.value = title;
    descriptionCourse.value = description;

    var edit = document.querySelector('.edit');
    edit.innerHTML = `Đang chỉnh sửa id = ${id}`;
    var updateBtn = document.querySelector('.updateBtn');
    updateBtn.setAttribute("onclick", `updateCourse(${id})`)
    
}

function updateCourse(id) {
    
    var nameCourse = document.querySelector('.name');
    var descriptionCourse = document.querySelector('.description');
    var data = {
        title: nameCourse.value,
        description: descriptionCourse.value
    }
    fetch(apiCourses + `/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(function(courses) {
        getCourses(renderCourse);
    })
}

var updateBtn = document.querySelector('.updateBtn');
updateBtn.onclick = function() {
    updateCourse();
}
    


