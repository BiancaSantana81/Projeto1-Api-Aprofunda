const express = require('express');
const router = express.Router();
const { v4: uuidv4, parse } = require('uuid');

let tasks = []; // Array para armazenar as tarefas -> let permite a modificação do array

/* Lista de tarefas */
const getTasks = router.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

/* Retorna uma tarefa com base em seu id */
const getTaskById = router.get('/task/:id', (req, res) => {
    const id = req.params.id;

    const task = tasks.find((t) => t.id === id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
});

/* Cria uma nova tarefa */
const createTask = router.post('/create/task', (req, res) => {
    const newTask = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        completed: false,
    };

    tasks.push(newTask);
    res.status(201).json({message: 'New Task created successfully', newTask});
});

/* atualiza todos os campos de uma tarefa */
const updateTask = router.put('/task/update/:id', (req, res) => {
    const id = req.params.id;

    const task = tasks.find((t) => t.id === id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = req.body.title;
    task.description = req.body.description;
    task.completed = req.body.completed;

    res.status(200).json({ message: 'Task updated successfully', task });

});

/* atualiza apenas um campo da tarefa */
const updateTaskStatus = router.patch('/task/update/item/:id', (req, res) => {
    const id = req.params.id;

    const task = tasks.find((t) => t.id === id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.completed = req.body.completed;
    res.status(200).json({ message: 'Task status updated successfully', task });
});

/* deleta uma tarefa */
const deleteTask = router.delete('/task/delete/:id', (req, res) => {
    const id = req.params.id;

    tasks = tasks.filter(task => task.id !== id);

    res.status(200).json({ message: 'Task deleted successfully', tasks});
});

module.exports = router;