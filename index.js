const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send({title: `it's start page`});
});

const db = {
    courses: [
        {id: 1, title: 'frontend'},
        {id: 2, title: 'backend'},
        {id: 3, title: 'qa'}
    ]
};

app.get('/courses', (req, res) => {
    const courses = db.courses;

    res.send(courses);
});

app.get('/courses/:id', (req, res) => {
    const id = req.params.id;

    const course = db.courses.find(course => course.id == id);

    if (course) {
        res.status(200).send(course);
    } else {
        res.send(404);
    }
});

app.post('/courses', (req, res) => {
    const { title } = req.body;
    
    if (!title) {
        res.status(404).json({message: 'Нет title'});
        return;
    }

    const newId = db.courses.length > 0 ? Math.max(...db.courses.map(course => course.id)) + 1 : 1;

    const newCourse = {
        id: newId,
        title: title
    };

    db.courses.push(newCourse)

    res.send(201);
});

app.delete('/courses/:id', (req, res) => {
    const id = req.params.id;

    db.courses = db.courses.filter(course => course.id != id);

    res.status(200).send(db.courses)
});

app.put('/courses/:id', (req, res) => {
    const id = req.params.id;

    const course = db.courses.find(course => course.id == id);

    if (course) {
        const { title } = req.body;

        course.title = title;

        res.status(200).send(course);
    } else {
        res.status(404);
    }
});

app.listen(PORT, () => {
    console.log('server is running');
});