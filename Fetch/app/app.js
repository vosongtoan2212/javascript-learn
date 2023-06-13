// Thêm/sửa/xóa khóa học với Fetch và REST API

var apiCourses = "http://localhost:3000/courses";


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
            <div class="content-${course.id}">
                <h2 class="title-course-${course.id}">${course.title}</h2>
                <p class="description-course-${course.id}">${course.description}</p>
            </div>
            <div class="edit-${course.id} display-none"">
                <div ">
                    <label for="name">Name:</label>
                    <input class="name-${course.id}" type="text" name="name">
                </div>
                <div ">
                    <label for="description">Description:</label>
                    <input class="description-${course.id}" type="text" name="description">
                </div>
            </div>
            <button class="delete-button-${course.id}" onclick="handleDeleteCourse(${course.id})">Xóa</button>
            <button class="edit-button-${course.id}" onclick="handleEditCourse(${course.id})">Sửa</button>
        </div>
        `
    })
    courseBlock.innerHTML = html.join('');
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
                <div class="content-${course.id}">
                    <h2 class="title-course-${course.id}">${course.title}</h2>
                    <p class="description-course-${course.id}">${course.description}</p>
                </div>
                <div class="edit-${course.id} display-none"">
                    <div ">
                        <label for="name">Name:</label>
                        <input class="name-${course.id}" type="text" name="name">
                    </div>
                    <div ">
                        <label for="description">Description:</label>
                        <input class="description-${course.id}" type="text" name="description">
                    </div>
                </div>
                <button class="delete-button-${course.id}" onclick="handleDeleteCourse(${course.id})">Xóa</button>
                <button class="edit-button-${course.id}" onclick="handleEditCourse(${course.id})">Sửa</button>
            `
            courseBlock.appendChild(newCourse);
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

function toggleHiddenShow (id) {
    var contentBlock = document.querySelector('.content-' + id);
    contentBlock.classList.toggle('display-none')

    var editForm = document.querySelector('.edit-' + id);
    editForm.classList.toggle('display-none')
}

function handleEditCourse(id) {
    var course = document.querySelector('#course-' + id);
    var title = document.querySelector('.title-course-' + id);
    var description = document.querySelector('.description-course-' + id);
    var nameCourse = document.querySelector('.name-' + id);
    var descriptionCourse = document.querySelector('.description-' + id);

    toggleHiddenShow(id);

    nameCourse.value = title.innerHTML;
    descriptionCourse.value = description.innerHTML;

    var updateBtn = document.createElement('button');
    var editBtn = document.querySelector('.edit-button-' + id);
    editBtn.classList.toggle('display-none');
    updateBtn.setAttribute("class", `updateBtn-${id}`)
    updateBtn.innerText = 'Cập nhật'
    course.appendChild(updateBtn)

    updateBtn.setAttribute("onclick", `updateCourse(${id})`)
    
}

function updateCourse(id) {
    
    var nameCourseEdit = document.querySelector('.name-' + id);
    var descriptionCourse = document.querySelector('.description-' + id);

    var data = {
        title: nameCourseEdit.value,
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
    .then(function(course) {  
        var title = document.querySelector('.title-course-' + id);
        var description = document.querySelector('.description-course-' + id);

        title.innerHTML = course.title;
        description.innerHTML = course.description;
        console.log(title);
        console.log(description);
    })
    toggleHiddenShow(id);
}
